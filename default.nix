{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/ad67ba85931322b7eccfc2c148809bf895471767.tar.gz") { } }:

pkgs.mkShell {
  buildInputs = [
    pkgs.nil
    pkgs.nixpkgs-fmt
    pkgs.deno
  ];
}
