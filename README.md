
<h1 align="center">
  <img src="docs/assets/logo1.png?raw=true" width="128">
  <br>
  KOUDOU
  <br>
</h1>

<h4 align="center">KOUDOU Flow supports your flow-based planning and action for crisis response with Node-RED backend</h4>

<p align="center">
<img src="docs/assets/sshot.png?raw=true" height="320">
</p>

<br>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#self-hosting">Self-hosting</a> •
  <a href="#project-details">Project Details</a> •
  <a href="#roadmap">Roadmap</a> •
  <a href="#authors">Authors</a>
</p>

## Features

- [x] Block-based planning made easy for every role in crisis response
- [x] Extendable and customizable using integrated Node-RED/Watson IoT Platform
- [x] Built-in Web-based mobile app and speaker interface for quickstart
- [x] Offline aware: PDF export (experimental), Save as JSON to run locally


## Getting Started

### Demo video

(demo video)

### Demo instance

- <https://koudou-demo.mybluemix.net/>

Running on a personal IBM Cloud account; please contact the team if the instance is down.

#### Example Case 1: Simlulate your own plan

1. Log in as `demo1@example.com`
2. Select "Response Plan for Earthquake (demo)"
3. Scan the QR code or click link to open your mobile app
4. (Optional) Set up a speaker interface
5. Return to the plan page and click "Simulate This Plan"
6. Click "Next Phase"
7. Click "Complete"

#### Example Case 2: Create a new plan

1. Log in as `demo1@example.com`
2. Click "Prepare a new plan" at the top
3. Select "Earthquakes"
4. Enter the Plan Description
5. Drag & Drop Step Blocks to the flow to make a plan
6. Save

#### Example Case 3: Demonstrate a crisis response operation

1. Open mobile app as `demo1@example.com` on your smartphone (follow example case 1)
2. On your laptop, log in as `demo2@example.com` by checking "Log in as operator" box
3. Select "Control" from right menu
4. Toggle "Issue New Alert"
5. Select "Feed" from right menu
6. Follow instructions on the mobile app
7. Check the feed and other operations

## Self-hosting

### Common

- Set the environment variable `DEMO` to `1` in `manifest.yml` or elsewhere to set up the instance as a demo.
- Set a secret `operatorToken` in `config/default.json` for operator login.
- Add API keys to related Node-RED nodes to enable Watson AI and other IBM Cloud services (e.g., Watson Text to Speech for speakers)

### Use a separate Node-RED instance

- Set the environment variable `NODEREDBASE` to your Node-RED **base** URL to use a separate Node-RED instance. (Default: `http://localhost:9000`)
- Import Node-RED flows for KOUDOU:
  - Copy the output of `node nodered-lib/splitter.js --join`
  - [Import it](https://nodered.org/docs/user-guide/editor/workspace/import-export) to your Node-RED instance

### Local (stand-alone, with Docker)

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


## Project Details

(long description)

Powered by/works with IBM Cloud services including:

- [IBM Cloud Foundry (IBM SDK for Node.js)](https://cloud.ibm.com/catalog/starters/sdk-for-nodejs)
- [IBM Cloud Foundry (Node-RED Starter)](https://cloud.ibm.com/catalog/starters/node-red-starter)
- [IBM Watson IoT Platform](https://cloud.ibm.com/catalog/services/internet-of-things-platform) ([Starter](https://cloud.ibm.com/catalog/starters/internet-of-things-platform-starter))
- [IBM Watson Text to Speech](https://cloud.ibm.com/catalog/services/text-to-speech)

## Roadmap

<p align="center">
<img src="docs/assets/roadmap.png?raw=true">
</p>

## Authors

- Toshiaki Okano
- Kentaro Ozeki
- Takeshi Sano
- Takaomi Takahashi
