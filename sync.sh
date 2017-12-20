git add --all :/
git commit -m "%s"
git push
git submodule foreach "git add --all :// || true"
git submodule foreach "git commit -m '%s' || true"
git submodule foreach "git push || true"
