# How to install Github and create a github account

Please [follow these instructions](https://github.com/git-guides/install-git) to install git on your OS.

You will also need a github account. If you do not already have one, you need to set up an account by following [these instructions](https://docs.github.com/en/get-started/quickstart/creating-an-account-on-github).

# How to create and manage a project repository in Git

Here are some instructions for creating and managing a project repository in GitHub.

## Creating a Project Repo

- Go to your online GitHub page and press the `+` symbol to create a new repo, as shown below:

![close-up to the + symbol for creating new repo](images/create-new-repo-symbol.png)

- Give a name to your repo, make it private or public and add a readme file to it, as shown below:

![close-up to the + symbol for creating new repo](images/create-new-repo-setup.png)

- Create your repo!

- You can always edit your repo (the existing readme file or any new files) from the web interface and commit changes directly there. Remember to add a meaningful commit message whenever you make a change! This will help you (and any other contributors) keep track of all changes.

## Managing the Project Repo - Option #1: Github Desktop

- Download Github Desktop from [here](https://desktop.github.com/).

- Clone your repo by selecting `Add` --> `Clone a Repository` --> `Github.com`. Your existing repos will show up and from there, you can select the one you wish to clone. Select the local path of your choice. This is where your repo will be stored locally.

![clone repo in Github Desktop](images/clone-repo.png)

- Now whenever you make a change (adding, removing, editing files on VS Code or other editors) to the files that exist in this local repo, the changes will show up as `changed files` in GitHub Desktop. Then, similarly to what you do on the web interface when commiting changes, you need to add a commit message for your changes and commit them.

- Finally, you need to `push` the changes, so that the remote repository syncs up with the changes that you made locally. Voila!

## Managing the Project Repo - Option #2: Command Line

- Open the terminal/command line and move to the directory where you want to store your repo, by typing the command `cd` along with the path to the directory, e.g.: `cd documents/github`

- Then type in `git clone` and add the HTTPS link to your git repo, as shown below:

![https link to repo](images/https-link-to-repo.png)

`git clone https://github.com/...`

- From this point onwards, you can make changes to your project (adding, removing, editing files on VS Code or other editors) and saving the changes locally. Whenever you want to commit these changes and push them into your remote repository, you need to open the terminal/command line and...

- Move into the directory of your project by typing `cd path-to-your-directory`

- Check the status of your git repo by typing `git status`. This will tell you whether there are local changes that haven't been commited yet, while also providing the name of the file(s) that has/have been edited. 

- Type in `git add name-of-the-edited-file`. This will tell git to keep track of the edited file(s).

- Then commit the change(s) by typing `git commit -m "your-commit-message"`.

- Then push the changes to the remore repo by typing `git push`. Voila!

### Important Notes

- It might be preferable to only do changes locally and then push them into the remote repo, instead of sometimes editing your files on the web interface and other times locally. If you decide to the latter, you will need to also `pull` changes from the remote repo and you might get confused while trying to keep the two repos synced.

- There is an option #3 for managing the project repo, which involves setting up Git in VS Code. If you want to process with this option, feel free to follow through [these instructions](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git).
