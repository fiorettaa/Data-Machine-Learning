## **Python Setup**

When it comes to installing Python, there can be many ways of implementing that. The install instructions below, follow the paradigm of [PyFAD](https://github.com/colormotor/PyFAD/blob/main/docs/conda_installation.ipynb), so that students who attended that module, continue with the same setup. 

We will use Miniforge to install Python efficiently. 

Setting up a Python environment (think of it as an ecosystem of packages) can sometimes feel like navigating a maze, as illustrated in the comic below. To simplify this process, we use [Conda](https://docs.conda.io/projects/conda/en/latest/), an open-source package and environment manager that works across Windows, macOS, and Linux. Conda allows for easy installation, updating, and dependency management while enabling seamless switching between different Python environments on your local computer.

![a fun representation of the maze of setting up a virtual environment](https://imgs.xkcd.com/comics/python_environment.png)

[Miniforge](https://github.com/conda-forge/miniforge) is a lightweight distribution of [Conda](https://docs.conda.io/projects/conda/en/latest/), designed to simplify package management and environment handling for Python users. Unlike the standard [Miniconda](https://docs.conda.io/en/latest/miniconda.html) and [Anaconda](https://www.anaconda.com/) distributions, Miniforge is built around the Conda-Forge community-maintained package repository, which provides up-to-date and optimised packages. It also includes [Mamba](https://mamba.readthedocs.io/en/latest/installation/mamba-installation.html), a faster alternative to Conda for package installation.

If you already have Conda installed, you can ignore the rest of this setup.

### Wondering if you already have Conda installed?

In a terminal, type `where/which conda`. Use `which` on Linux/macOS, `where` on Windows.

If it says something to the effect of ``conda not found``, then you are good to continue with your installation.

### **Installation Steps**

#### **macOS & Linux:**

1. Open Terminal

2. Run:
   ```bash
   curl -L -O "https://github.com/conda-forge/miniforge/releases/latest/download/Miniforge3-$(uname)-$(uname -m).sh"
   bash Miniforge3-$(uname)-$(uname -m).sh
   ```
   Where ``(uname)-$(uname -m)`` replace with the specific name of your operation system. See [Requirements and Installers](https://github.com/conda-forge/miniforge).

3. Close and reopen Terminal. If successful, you’ll see **(base)** in the prompt but you can also check with the method mentioned above.

#### **Windows:**

1. Download Miniforge from [GitHub > Install > Windows ](https://github.com/conda-forge/miniforge) (Windows x86_64 version)

2. Run the installer with default settings. Select "Just Me" when asked.

3. Open **Miniforge Prompt** for command-line operations. This is the terminal you should use -instead of the official Windows terminal- whenever you want to install dependencies.

### **Creating Environments**

By the time you have ``conda`` installed, you can create an environment specifically for our module where you will be installing all necessary packages from now on.

1. Open Terminal or Miniforge Prompt

2. Create a Python environment, named ``dmlap`` for our module:
   ```bash
   conda create -n dmlap python=3.10
   ```
3. Activate the environment:
   ```bash
   conda activate dmlap
   ```
4. To deactivate:
   ```bash
   conda deactivate
   ```
Where ``conda``, you could also use ``mamba`` for faster execution. ``conda`` and ``mamba`` can be used interchangeably.

### **Managing Environments**

When you have an environment activated (step 3), you can:

- Check what packages are installed in your environment: ```conda list```
- Install a new package, e.g. 'jupyter': ```conda install -c conda-forge jupyter```
- Remove a package (e.g. 'jupyter' if already installed) from your currently active environment: ```conda remove jupyter```
- Remove a list of packages from an environemnt called 'myenv': ```conda remove -n myenv scipy curl wheel```

While you are on your base environment, you can also: 
- List all your conda environments: ```conda env list```
- Remove an existing environment that you no longer want: ```conda env remove --name myenv```

This is just a selection of ``conda`` commands that can be handy to use. Look into the [reference page](https://docs.conda.io/projects/conda/en/latest/user-guide/getting-started.html) and the [cheatsheet](https://docs.conda.io/projects/conda/en/latest/user-guide/cheatsheet.html) for more.

### **Using Python in VSCode**

1. Install VSCode and extensions: **Python** and **Jupyter**

2. Open a Jupyter Notebook (`.ipynb`)

3. On the top right corner of your window, click **Select Kernel** > **Select Environment** and choose your Miniforge environment

4. Open a code cell and run:
   ```python
   print("Hello world")
   ```

### **Troubleshooting**

If something goes wrong, delete the Miniforge directory (a local folder for your current user) and reinstall.

