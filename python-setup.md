# IS71074B/A: DMLAP - Python Setup and Conda Environments

# 1. Python Setup

You will be installing Python using a package called Miniconda.

[Miniconda](https://docs.conda.io/en/latest/miniconda.html) is a small, bootstrap version of [Anaconda](https://docs.conda.io/projects/conda/en/latest/glossary.html#anaconda-glossary) that includes conda, Python, the packages they depend on, and a small number of other useful packages, including pip, zlib and a few others.
This will give you Python, as well as some useful packages that you’ll need, as well as a way for you to manage and switch between different python environments (more on that later), and install new packages and libraries.

[Conda](https://docs.conda.io/projects/conda/en/latest/) is an open-source package and environment management system that runs on Windows, macOS, and Linux. Conda quickly installs, runs, and updates packages and their dependencies. It also easily manages and switches between different (python) environments on your local computer (more on than later). 

If you already have Anaconda or Miniconda installed, you can ignore the rest of this set up.

## How to know if conda is already installed?

### Mac OSX

Open up a Terminal and type ``which conda``

### Windows

Open up a Terminal and type ``where conda``

If it says something to the effect of ``conda not found``, then you are good to continue with your installation.

## Installing Miniconda 

Go to the [Downloads page](https://docs.conda.io/en/latest/miniconda.html) and get the installer for your machine.

### Mac OSX

Is your Mac an M1 or M2?

If so, get the correct installer: Miniconda3 macOS Apple M1 64-bit pkg 

Older intel Macs should use: Miniconda3 macOS Intel x86 64-bit pkg

### Windows

You probably have a 64 bit machine: Miniconda3 Windows 64-bit

Follow the instructions on the installer that runs 

## Checking Installation 

Close any open Terminals or Command Prompts, then reopen a new one 

### Mac OSX

* ``which conda`` should return a message 
* ``which python`` should return a file path to a miniconda installation 

### Windows

* ``where conda`` should return a message 
* ``where python`` should return a file path to a miniconda installation

# 2. Setting up a Conda Environment 

A [conda environment](https://docs.conda.io/projects/conda/en/latest/user-guide/concepts/environments.html) is a directory that contains a specific collection of conda packages that you have installed. For example, you may have one environment with NumPy 1.7 and its dependencies, and another environment with NumPy 1.6 for legacy testing. If you change one environment, your other environments are not affected. This allows you to work cleanly on your different projects that may require different versions of libraries or Python itself. You can easily activate or deactivate environments, which is how you switch between them. 

## Creating the environment

We are going to create a new conda environment (a specific collection of packages) for this unit, which is a good practice, especially if you are doing other Python/ML work on the same machine, or if you're on a shared machine.

You can use the terminal/console and type: 

``conda create --name dmlap python=3.9`` 

This will create a Python 3.9 environment named 'dmlap', standing for 'Data and Machine Learning for Artistic Practice'. Feel free to choose some other name if you prefer. (Notice that we are selecting a specific version of Python. In some projects, there might be incompatibility between a Python version and another dependency. In that case, you will need to create a new conda environment with different configurations.)

You then need to activate this environment by typing:

``conda activate dmlap``

And you can always deactivate it by typing:

``conda deactivate``

Once you've created and activated the environment, install jupyter (for using Jupyter Notebook, a web-based interactive computational environment for creating notebook documents) and pandas (a data analysis tool) using the terminal/console:

``conda install -c conda-forge -y pandas jupyter``

The two packages are now installed **only** in your environment dmlap. From now on, make sure you always activate this environment when working on the lab/project activities of this module!

## Checking what packages are installed in your environment

```conda list```

## Removing a package from your environment

Remove the package 'scipy' from the currently-active environment:

```conda remove scipy```

Remove a list of packages from an environemnt 'myenv':

```conda remove -n myenv scipy curl wheel```

## Listing all your conda environments

```conda env list```

## Removing an existing conda environment

Removing an environment 'myenv': 

```conda env remove --name myenv```

## More info can be found here:

[Getting Started with Conda](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html)

[Conda Cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html)

![a fun representation of the maze of setting up a virtual environment](https://imgs.xkcd.com/comics/python_environment.png)