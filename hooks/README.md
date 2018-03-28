# Hooks
Using different hooks help us keep the code quality top notch.
We currently have one (pre-commit) hook but more might come later.

To get the hook to work, either run `./hook` in the `hook` dir or run following command in git repository root:
  
`$ ln -s -f ../../hooks/pre-commit .git/hooks/pre-commit`