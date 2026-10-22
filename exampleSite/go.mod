module github.com/lowdit/higo/exampleSite

go 1.20

require github.com/lowdit/higo v0.9.1

// Build local / CI depuis la racine du dépôt : le thème = checkout courant (fork de hugo-liftoff).
replace github.com/lowdit/higo => ../
