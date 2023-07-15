{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/fc66814d6f1ce6eb8cbe8787592414df686ad35d";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = with pkgs;
          mkShell {
            buildInputs = [
              nil
              nixpkgs-fmt
              deno
              typos
            ];
          };
      });
}
