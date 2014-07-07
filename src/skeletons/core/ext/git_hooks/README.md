based on https://gist.github.com/domenic/2238951

# Warning:
To be able to use the git-hooks here. What you need to do, update the file mode to be executeable, otherwise, it won't be able to register the git hooks automatically. Ex:  chmod +x .git/hook/pre-commit

- Now, Grunt link task will automatically make new hook files executable


1. How it works ?

`grunt link:all`     // link all of the hooks with .js extension into the .git/hooks folder
`grunt link:pick`  // need to specific guard array inside Gruntfile=>link:pick task, then ONLY matched hooks file with .js extension 						will be copied into .git/hooks. .js extension will be dropped. Note: if need other extension, modify the Grunt file
`grunt link:remove`  // remove one or more hook files from .git/hooks/ folder, based on the guard array
`grunt link:removeAll`  // remove all of the custom hook files from .git/hooks folder

For example: it will symlink `pre-commit` script here into .git/hooks/pre-commit. so that You do not have to open .git/hook all the time.

Note: After you modify the existing hook file(s), it need to manually call this task again to re-link the hook task, otherwise, the hook file won't update itself automatically.


2. current Available git hook file name below:

applypatch-msg.js
commit-msg.js
update.js

post-commit.js
post-receive.js
post-update.js

pre-applypatch.js
pre-commit.js
pre-rebase.js
prepare-commit-msg.js

- Unofficial

    post-applypatch
    post-checkout
    post-merge
    pre-receive
    pre-auto-gc
    post-rewrite


3. Gruntfile link task options

- remove: decide the task is removing the file or add/modify the existing file. the remove parameter has been predefined in the Gruntfile, so you do not have to modify this value. It is for internal usage only

- guard: Array. it is used to determine which file will be added or removed. user need to manage this array itself. Task all and removeAll have definied all the git hooks file name. By default, the system itself will check the available filename, auto drop the unmatched the filename (ex: matt.js), so it will only symlink the right git hook file


4. Interesting Project

Search on github:  git hook node

# expose git hooks as a node.js EventEmitter
https://github.com/substack/node-git-emit
