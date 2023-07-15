{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/fc66814d6f1ce6eb8cbe8787592414df686ad35d.tar.gz") { } }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nil
    pkgs.nixpkgs-fmt
    pkgs.deno
    pkgs.typos
  ];
}
