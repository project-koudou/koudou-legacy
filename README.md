
<h1 align="center">
  <img src="docs/assets/logo1.png?raw=true" width="128">
  <br>
  KOUDOU
  <br>
</h1>

<h4 align="center">KOUDOU supports your flow-based planning and action for crisis response with Node-RED backend</h4>

<p align="center">
<img src="docs/assets/sshot.png?raw=true" height="320">
</p>

<br>

<p align="center">
  <a href="#getting-started">Getting Started</a> •
  <a href="#features">Features</a> •
  <a href="#self-hosting">Self-hosting</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#authors">Authors</a>
</p>

## Getting Started

(demo instance and usage)

(demo video)

(long description)

Powered by/works with IBM Cloud services including:

- [IBM Cloud Foundry (IBM SDK for Node.js)](https://cloud.ibm.com/catalog/starters/sdk-for-nodejs)
- [IBM Cloud Foundry (Node-RED Starter)](https://cloud.ibm.com/catalog/starters/node-red-starter)
- [IBM Watson IoT Platform](https://cloud.ibm.com/catalog/services/internet-of-things-platform) ([Starter](https://cloud.ibm.com/catalog/starters/internet-of-things-platform-starter))
- [IBM Watson Text to Speech](https://cloud.ibm.com/catalog/services/text-to-speech)

## Features

- [x] Block-based planning made easy for every role in crisis response
- [x] Built-in Web-based mobile client and speaker for quickstart
- [x] Integrated with Node-RED/Watson IoT Platform to customize and extend on-demand
- [x] Offline aware: PDF export (experimental), Save as JSON to run locally

## Self-hosting

### Common

- Set the environment variable `DEMO` to `1` in `manifest.yml` or elsewhere to set up the instance as a demo.
- Set a secret `operatorToken` in `config/default.json` for operator login.

### Use a separate Node-RED instance

- Set the environment variable `NODEREDBASE` to your Node-RED **base** URL to use a separate Node-RED instance. (Default: `http://localhost:9000`)
- Import Node-RED flows for KOUDOU:
  - Copy the output of `node nodered-lib/splitter.js --join`
  - [Import it](https://nodered.org/docs/user-guide/editor/workspace/import-export) to your Node-RED instance

### Local (with Docker)

```
$ docker-compose build --build-arg DEMO=1
$ docker-compose up  # Startup http://localhost:3030/
```

```
$ docker-compose down  # Shutdown
```

### IBM Cloud (stand-alone)

Prerequisite:

- Set up [`ibmcloud` CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) with your IBM Cloud account

```
$ ibmcloud cf push
```

### IBM Cloud (advanced, with Watson IoT Platform/Node-RED Starter)

Prerequisites:

- Set up [`ibmcloud` CLI](https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started) with your IBM Cloud account
- Set up Watson IoT Platform/Node-RED Starter from [the IBM Cloud catalog](https://cloud.ibm.com/catalog)
  - Set `NODEREDBASE` to the base URL of your Node-RED instance
  - (Optional) Set `noderedAPIPath` to the base path for APIs exposed by Node-RED (Default on IBM Cloud Starter: `/`)
- Set the environment variable `SYSTEM_URL` of **your Node-RED instance** to the host of your KOUDOU instance.

```
$ ibmcloud cf push
```

_"Deploy to IBM Cloud" buttons are in preparation._


## Roadmap

(roadmap image)

## Authors

- Toshiaki Okano
- Kentaro Ozeki
- Takeshi Sano
- Takaomi Takahashi
