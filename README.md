# Create Dotnet Version

This action created various versions based on the [Semantic Versioning 2.0.0](https://semver.org/) specification.

## Dotnet Versioning

### Version numbers

This project follow the below versioning guidelines.

| Version              | Format                                      | Description                                                                                                                                                                                        |
| -------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AssemblyVersion      | `major.minor.0.0`                           | The assembly version is what the CLR uses at run time to select which version of an assembly to load. It is scoped to only major and minor version changes. Indicates backward compatibility.      |
| FileVersion          | `major.minor.patch.build`                   | The assembly file version is used to display a file version in Windows. It includes a patch and build number, indicating the exact version of the application.                                     |
| PackageVersion       | `major.minor.patch[-pre-release]`           | Contains the NuGet package version which is displayed on NuGet.org. It includes a pre-release identifier. This is also the informational version used to communicate.                              |
| InformationalVersion | `major.minor.patch[-pre-release]+commit-id` | The assembly informational version is used to record additional version information. It includes the commit id. This is the most specific version and has a direct reference to the github commit. |

[Versioning and .NET Libraries](https://docs.microsoft.com/en-us/dotnet/standard/library-guidance/versioning)

### Dotnet versions usage configuration

This action generates the version attributes commonly used in dotnet project files.

```xml
<PropertyGroup>
	<AssemblyVersion>1.0</AssemblyVersion>
	<FileVersion>1.0.0.123</FileVersion>
	<InformationalVersion>1.0.0-beta.1+204ff0a</InformationalVersion>
	<PackageVersion>1.0.0-beta.1</PackageVersion>
</PropertyGroup>
```

## Inputs

### `baseversion`

**Required** version value used to generate the other version attributes.

Example values are:

- `v1.0.0`
- `1.0.0`
- `v1.0.0-beta`
- `1.0.0-rc.1`

**Note :** The 'v' character is trimmed during the processing.

## Outputs

### `version-assembly`

The version according to the `AssemblyVersion` format.

### `version-file`

The version according to the `FileVersion` format.

### `version-informational`

The version according to the `InformationalVersion` format.

### `version-package`

The version according to the `PackageVersion` format.

### `buildnumber`

The unique build number generated during the action.

## Example usage

### Using the action in a workflow job

Add the following step to your job referencing the repository and action folder you want to use.

Either use a _tag_ (preferred) or _branch_ name for the `{ref}`. This makes sure that changes do not potentially effect your build.

```yaml
- name: Get version from tag
  id: dotnet-versions
  uses: martijnvanschie/create-dotnet-versions@{ref}
  with:
    baseversion: "1.2.3-beta.1"
```

Example ref uaing tag:

```yaml
uses: martijnvanschie/create-dotnet-versions@main
```

Example ref uaing tag:

```yaml
uses: martijnvanschie/create-dotnet-versions@v1.0.0-rc.1
```

### Reading the output parameters

The following step displays the versions returned by the action

```yaml
- name: Echo all version outputs
  run: |
    echo version-assembly = ${{ steps.dotnet-versions.outputs.version-assembly }} 
    echo version-file = ${{ steps.dotnet-versions.outputs.version-file }}
    echo version-informational = ${{ steps.dotnet-versions.outputs.version-informational }}
    echo version-package = ${{ steps.dotnet-versions.outputs.version-package }}
    echo buildnumber = ${{ steps.dotnet-versions.outputs.buildnumber }}
```

## used packages

[@actions/core](https://www.npmjs.com/package/@actions/core)

[@actions/github](https://www.npmjs.com/package/@actions/github)
