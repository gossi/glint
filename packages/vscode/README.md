# Glint VS Code Extension

A Visual Studio Code extension for the [Glint] language server.

[glint]: https://github.com/typed-ember/glint

## Setup

See the [Glint home page] for a more detailed Getting Started guide.

1. Add `@glint/core`, `@glint/template` and an appropriate environment package to your project's `devDependencies`.
1. Add a `"glint"` key to your project's `tsconfig.json` or `jsconfig.json` specifying your environment and any other relevant configuration.
1. Consider disabling the built-in `vscode.typescript-language-features` extension for any workspaces where you use Glint to avoid extraneous diagnostics. Note that it is not necessary to disable the `@builtin typescript` extension if you are running V2 Glint with the pre-release of the Glint extension (`v1.4.3`, as of March 23 2025).

<details><summary>Instructions</summary>

1. In your project workspace, bring up the extensions sidebar `Ctrl + Shift + X` (macOS: `Cmd + Shift + X`).
1. Type `@builtin typescript` in the extension search box
1. Click the little gear icon of "TypeScript and JavaScript Language Features", and select "Disable (Workspace)".
1. Reload the workspace. Glint will now take over TS language services.

<img src="https://user-images.githubusercontent.com/108688/111069039-6dc84100-84cb-11eb-8339-18a589be2ac5.png" width="500">
</details>

[glint home page]: https://typed-ember.gitbook.io/glint

### Monorepos and Other Non-Workspace-Root Installations

If the location where `@glint/core` is installed isn't in the root of your Code workspace, you can inform the extension on a per-workspace basis where to locate the language server in the Glint extension settings under **Glint: Library Path**.

<img width="705" alt="Input for `glint.libaryPath` in the VS Code configuration editor." src="https://user-images.githubusercontent.com/108688/206561138-aca2bb80-04f6-44dd-a23f-032d4f163f7a.png">

For example, if your dependency on `@glint/core` were declared in `frontend/package.json` in your workspace, you could set the library path to `./frontend` in order for the extension to be able to locate it.

## Usage

The Glint language server incorporates Glimmer templates into TypeScript-powered tooling for a project, enabling them to participate in rich editor features such as:

- Quickinfo on hover:
  <br>
  <img src="https://user-images.githubusercontent.com/108688/111069238-6eada280-84cc-11eb-9abb-c2d3af5e8976.png" width="590" alt="Signature information being shown on hover for a component's named block">
- Go to definition:
  <br>
  <img src="https://user-images.githubusercontent.com/108688/111069304-b6ccc500-84cc-11eb-83b2-49681b248cbe.png" width="912" alt="The definition for a component being shown from the site of its invocation in a template">
- Symbol renaming:
  <br>
  <img src="https://user-images.githubusercontent.com/108688/111070668-ff877c80-84d2-11eb-9a5a-57ae9be7fe2a.gif" width="447" alt="Fields on an object being renamed and having their other uses updated to match">
- Find references:
  <br>
  <img src="https://user-images.githubusercontent.com/108688/111070826-c6034100-84d3-11eb-9c12-e8e80e168940.png" width="931" alt="Template snippets where a component is used being shown from the site of its declaration">
- Completions:
  <br>
  <img src="https://user-images.githubusercontent.com/108688/111070948-3f9b2f00-84d4-11eb-9eaa-077cadf6f380.png" width="1010" alt="Component arguments being suggested with type information and documentation">
