# nginx-template-based-config

This is the source code for a [blog post]() I wrote.


### src

The src folder contains nginx configuration files with handlebars markup. 

### config

Contains environment specific configuration.

### build.js

Compiles the templates under `src` for each json file in `config`.

### target

Contains the compiled output for each environment.