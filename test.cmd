CALL npx ncc build src/index.js -o dist --license licenses.txt
type nul > github.output

set GITHUB_OUTPUT=github.output
set INPUT_version-assembly=1.0
set INPUT_version-file=1.0.0.123
set INPUT_version-informational=1.0.0-beta.1+204ff0a
set INPUT_version-package=1.0.0-beta.1
set INPUT_projectFile=package.props

node ./dist/index.js