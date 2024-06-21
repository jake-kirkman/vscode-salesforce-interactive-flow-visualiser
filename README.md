# Salesforce Interactive Flow Visualiser

Visualise your Salesforce Flows inside of your VSCode environment using this extension!

You'll be able to interact with the flow nodes like you would in any flow diagramming tool, meaning you can move the view around,
drag nodes around, see connections with similar UI to what you will find inside of Salesforce.

![Demo of extension](/media/visualise-flow-demo.gif)

## Features

- Commands:
  - `Flows: Visualise Flow` - Opens the currently viewed flow in a new VSCode tab and visualises the flow you had open.

## Usage

Open the Salesforce Flow you wish to visualise inside of VSCode, then run the `Flows: Visualise Flow` command and 
your flow will now open in a new tab where you can interact with it like any ordinary flow tool.

## Upcoming Features

This was more of a hobby project for me, and it's still very early in development, and there's quite a few features I'd love to implement, but it's just finding the time to do so.

Here are some features I'm planning on adding to this extension, feel free to suggest some to me via my github repo's issues if you've got an ideas!

- TODO: Ability to add multiple flows to one visualiser tab (e.g see branching flows in one screen)
- TODO: Ability to see Flow variables etc
- TODO: Ability to visualise more details about each node, like see what components are on a screen flow, or what properties are being assigned during an assignment etc.
- TODO: Add more settings to allow more customisations, e.g hiding minimap etc

## Extension Settings

Nothing yet! Will be soon

## Known Issues

- Scheduled paths may not connect nodes properly

If you find any issues, feel free to report them here: 
https://github.com/jake-kirkman/vscode-salesforce-interactive-flow-visualiser/issues

Flows are quite complex and have many branching possibilities, so reporting issues will make this a better extension for everyone 

## Development notes

For those interested, this was build using Preact and packaging the extension using Webpack to have the two contexts (UI + VSCode Extension), then utilising ReactFlow for the interactivity within the UI.

## Release Notes

### 0.1.0

Initial Release.