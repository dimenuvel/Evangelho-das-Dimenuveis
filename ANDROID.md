# Android build setup (Capacitor)

Resumo rápido:
- Projeto web: `dist` (conforme `vite build`).
- Usamos Capacitor para embrulhar a app no Android (`capacitor.config.json`).

Requisitos locais:
- Java JDK 11 (Temurin/AdoptOpenJDK) instalado.
- Android SDK com plataforma >= 33 e `build-tools` 33.0.2.
- `node` >= 18 e `npm`.

Secrets recomendados para builds assinadas (GitHub Secrets):
- `ANDROID_KEYSTORE_BASE64` — conteúdo base64 do arquivo `.jks`.
- `ANDROID_KEYSTORE_PASSWORD` — senha do keystore.
- `ANDROID_KEY_ALIAS` — alias da chave.
- `ANDROID_KEY_PASSWORD` — senha da chave (se diferente).

Workflows adicionados:
- `.github/workflows/android-on-push.yml` — roda em `push`/`pull_request` na branch `main`.
- `.github/workflows/android-manual.yml` — acionamento manual (`workflow_dispatch`), suporta assinatura via secrets.

Pontos que precisam de confirmação (você deve fornecer ou confirmar):
- `appId` e `appName` em `capacitor.config.json` (atualmente: `com.example.evangelho`, `EvangelhoDasDimenuveis`).
- Keystore para assinatura de release (se quiser APK assinado). Configure os secrets acima para o workflow usar.

Observações sobre prompts/telemetry:
- Os workflows definem `CI=true` e rodam headless; não haverá prompts interativos.
- Não habilitamos nenhum telemetry/analytics do projeto; se algum serviço pedir confirmação, não aceitamos por padrão.

Como gerar localmente a primeira vez:
1. Instale dependências: `npm ci`
2. Criar plataforma Android (se não existir): `npx cap add android`
3. Construir e copiar: `npm run prepare:android`
4. Abrir Android Studio: `npx cap open android` ou construir via CLI: `cd android && ./gradlew assembleRelease`

Assinatura (configuração do Gradle):

1) A workflow cria `android/keystore.properties` quando o secret `ANDROID_KEYSTORE_BASE64` está presente. Para que o Gradle use esses valores, adicione ao topo de `android/app/build.gradle` (ou equivalente) o carregamento das propriedades:

```groovy
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
	keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

2) Em `android/app/build.gradle`, configure `signingConfigs` e associe ao `buildTypes.release`:

```groovy
android {
	signingConfigs {
		release {
			storeFile file(keystoreProperties['storeFile'])
			storePassword keystoreProperties['storePassword']
			keyAlias keystoreProperties['keyAlias']
			keyPassword keystoreProperties['keyPassword']
		}
	}

	buildTypes {
		release {
			signingConfig signingConfigs.release
		}
	}
}
```

3) Se você prefere, também é possível usar `gradle.properties` ou colocar as propriedades diretamente em `android/gradle.properties`; a abordagem com `keystore.properties` é mais segura pois o arquivo pode ser gerado dinamicamente no CI e não commitado.

Windows (PowerShell) e snippet para Secret:

Exemplo (Windows PowerShell) para gerar base64:

```powershell
# Gera o arquivo base64 a partir do keystore
[Convert]::ToBase64String([IO.File]::ReadAllBytes("my-release-key.jks")) | Out-File -Encoding ascii my-release-key.jks.base64

# Mostrar conteúdo para copiar/colar no Secret
Get-Content -Raw my-release-key.jks.base64
```

Snippet para colar no campo `ANDROID_KEYSTORE_BASE64` (copie todo o conteúdo de `my-release-key.jks.base64` e cole no secret):

```
<conteúdo do arquivo my-release-key.jks.base64 (uma linha longa base64)>
```

Se quiser, posso também adicionar instruções para automatizar a criação do Secret via `gh` CLI.

