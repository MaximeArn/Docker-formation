# Docker Formation

![](ressources/docker-logo.png)

## What is Docker ?

Docker is an open source tool developed in Go and created in 2012 by 3 french engineers

A good first definition of Docker is : "A tool used to package an app and its dependencies in an isolated container that can be executed in each environment"

## How docker works ?

Docker can be executed only in a linux environment. For people working on OSX or Windows we must use docker via a virtual machine.
When executing docker on OSX or Windows it will use an hypervisor (Hyper-V for Windows and xhyve for OSX) that will emulate a VM with Linux kernel.

With the linux kernel we can use the docker deamon that will allow us to execute containers.

##### VM vs Docker

A VM is a software machine that is executed on an host machine (a server or a computer). It takes a art of the hardware ressources and use it to run. The principal disadvantage is the loss of ressources because the same quantity of hardware ressources are now use to run more processes.

![](ressources/vm-schema.png)

Docker is very different because it use the linux kernel and it share it to every containers. It means that each container does not have the entire OS (that is a heavy program).

![](ressources/docker-schema.png)

##### Why Docker is only executable on linux ?

Docker is an API that allow use to use the low level featurs of linux easily.

###### Les namespaces

namespaces are a linux feature allowing the creation of isolated spaces on a Linux OS. It is this feature of Linux that gives containers their isolation.

###### Cgroups

Cgroups for "control groups" allows to limit the access to ressources to processes. thanks to this Docker can distribute the different ressources (CPU,GPU,RAM,bandwidth,write and read hard disk) between the different processes.
It is also possible to limit the allowed ressources for each container.

###### UnionFS

UnionFs for (Union File Systeme) is a type of filesystem for linux.
Depending on the Linux distribution, Docker uses one of the available implementations.
These file systems work by creating layers. They are at the heart of Docker images and allow them to be light and very fast.

## Docker Ecosystem

### Docker Engine

##### Docker deamon

The main piece of docker is the docker deamon (dockerd). The docker deamon is the process that will create all the Docker objects (images, containers, volumes... ). The dockerd is blocked and we cannot communicate directy with it.

the Docker Engine is built on the client/server pattern. It is composed of three parts.
![](ressources/Docker-engine.png)

###### Docker Client

The docker client is a CLI (command line interface). The CLI translate commands entered by the developer in request for the API

###### Docker server

The docker server is the docker deamon and the API that allow us to communicate with it.

### Docker Objects

###### Images

a Docker image is a readonly schema that contains all the informations to create a Docker container.
To create a Docker image we must use a specific file called Dockerfile (with a specific syntax) used to define the steps necessary to create the image. Most often, an image is itself based on another image

###### Container

a container is a instance of an image running and that can take configuration options set at the launch.We can create as much container as we want from an image. To create, start, stop, move or delete a container, you have to use the CLI.
By default, a container is isolated from other containers and from the host machine. It is of course possible to configure this isolation by modifying the networks to which the container is connected, the storage etc.

###### Volumes

Volumes allow containers to store data. They are initialized when creating a container. They are used to persist and share data from a container.
These volumes are stored outside of the UnionFS system that we have seen. They allow data to be preserved even if a container is deleted, updated or reloaded.

### Scale with Docker

##### Multi-containers app

###### Docker Compose

Docker Compose is the Docker tool for defining and launching multi-container applications. With Docker COmpose we will be able to create a container per service (DB, Auth, API...) and launch all the services of the app with an only command.

##### Multi-host app

Use an orchestrator for multi-host with Docker swarm or Kubernetes

###### Docker Swarm

Docker swarm is the Docker tool to manage multi-host application. It use the same config file that Docker compose but different commands.

###### Kubernets

Kubernets is a tool to manage multi multi-host application developed by Facebook. It allows you to do a lot more things than Docker Swarm but takes a lot longer to learn.

## First Container

#### First run

Docker has an example container that allows you to see how launching a container works.
this image is called `hello-world`

When running `docker run hello-world` we ask the docker deamon (via the docker client) to run a new container from specified image.

In a first time, dockerd will search if the image is locally unable. Because it is the first time that we try to use this image, it was not yet downloaded from the **docker hub** docker indicates that it cannot find the image on your machine :

```bash
Unable to find image 'hello-world:latest' locally
```

The `:latest` is the tag of the image, its version. By default if we don't provide a tag, docker will search on the registry (Docker Hub) the latest version.

`latest: Pulling from library/hello-world`

Docker will then retrieve the image from the configured registry (which is Docker Hub by default). It actually runs `docker pull hello-world`

```bash
0e03bdcc26d7: Pull complete
Digest: sha256:7e02330c713f93b1d3e4c5003350d0dbe215ca269dd1d84a4abc577908344b30
Status: Downloaded newer image for hello-world:latest
```

Docker indicates that the download (pull) is completed. It provides the **digest** of the image that is its unique id (this is actually a SHA256 hash of the image's JSON configuration).

The rest of the message is displayed by the container. To display the message, the docker deamon created a new container based on on the hello-world image.

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

#### Rerun

If we rerun the image, all the download phase disparaître

```bash
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

Indeed the image has already been pull. we can verify if an image is already available locally with the following command `docker images`

```bash
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
hello-world   latest    bf756fb1ae65   14 months ago   13.3kB
```

we can also list the different containers usig `docker container ls -a`

```bash
CONTAINER ID   IMAGE         COMMAND    CREATED         STATUS                     PORTS     NAMES
ed74998d24d8   hello-world   "/hello"   4 minutes ago   Exited (0) 4 minutes ago             admiring_lewin
c091bf98a2af   hello-world   "/hello"   2 hours ago     Exited (0) 2 hours ago               strange_chatelet
78983cf4b0a2   hello-world   "/hello"   2 hours ago     Exited (0) 2 hours ago               lucid_gates
```

we can see that each run of the hello-world image create a new container.

## Run a container

#### The `run` command

the docker `run` command is an allias for multiple commands :

```bash
docker pull image
docker container create -d image
docker container start ID
docker container -a ID
```

#### The `-i` option

The `-i` option (alias for `--interactive`) is an option which allows to keep the standard input open even if the process is started by default in the background or if it does not start a service and therefore quits immediately.

To try it we will use the alpine image. Alpine is a distribution of Linux that has the particularity to be very light (5.57Mb vs 80Mb for Ubuntu)

if we run alpine image to create a new container we can see that except the pull phase nothing is happening. Indeed this image does not launch any program by default and since there is nothing to execute the contaner (that is a process) stops.

if we run now the same command with the `-i` option, the container does not stop and we can writ einside.

if we write `ls` to list repositories the return is :

```zsh
ls
bin
dev
etc
home
lib
media
mnt
opt
proc
root
run
sbin
srv
sys
tmp
usr
var
```

#### the `-t` option

the `-t` option (alias for `--tty`) launch a terminal and allocate it to the container

running the `-t` option in addition to the` -i` option open an sh terminal connected to the container and so to the Alpine OS.

if we run `docker run -it alpine` and we print ls we now have the formatted repositories list.

```sh
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
```

#### background and foreground mode

###### Foreground mode

By default the `run` command execute the container in foreground.
If we run `docker run alpine ping google.fr`

_Here it will create and start an alpine container and ask it to start the `ping google.fr` command.
This command sends packets at regular time intervals to google.fr to obtain network statistics._

We can see that the standard output, the error output and the standard input of the container are connected to the terminal. We can see the following return :

```sh
PING google.fr (172.217.18.195): 56 data bytes
64 bytes from 172.217.18.195: seq=0 ttl=37 time=45.958 ms
64 bytes from 172.217.18.195: seq=1 ttl=37 time=46.778 ms
64 bytes from 172.217.18.195: seq=2 ttl=37 time=93.455 ms
64 bytes from 172.217.18.195: seq=3 ttl=37 time=45.174 ms
64 bytes from 172.217.18.195: seq=4 ttl=37 time=45.841 ms
64 bytes from 172.217.18.195: seq=5 ttl=37 time=51.209 ms
64 bytes from 172.217.18.195: seq=6 ttl=37 time=56.460 ms
64 bytes from 172.217.18.195: seq=7 ttl=37 time=46.567 ms
64 bytes from 172.217.18.195: seq=8 ttl=37 time=45.386 ms
```

thanks to the connexion of the standard input of the container to host's terminal we can stop the process using `ctrl + C`

###### Background mode

To run a container in background mode we must add the `-d` otion (alias for `--detach`)

`docker run -d alpine ping google.fr`

The container is not lunched in interactive mode so the input and output are not connected to the host's terminal. We can not interact with the container and it can not interact with us.

we can display the logs of this container using the `docker logs` command followed by the container id :
`docker logs 8f7ecaf543f89ddef1a268b10482aaf752e358e970495c48bd3132f2b42297cb`

```sh
PING google.fr (172.217.18.195): 56 data bytes
64 bytes from 172.217.18.195: seq=0 ttl=37 time=46.762 ms
64 bytes from 172.217.18.195: seq=1 ttl=37 time=47.150 ms
64 bytes from 172.217.18.195: seq=2 ttl=37 time=51.822 ms
64 bytes from 172.217.18.195: seq=3 ttl=37 time=52.184 ms
64 bytes from 172.217.18.195: seq=4 ttl=37 time=45.302 ms
64 bytes from 172.217.18.195: seq=5 ttl=37 time=45.143 ms
64 bytes from 172.217.18.195: seq=6 ttl=37 time=63.402 ms
64 bytes from 172.217.18.195: seq=7 ttl=37 time=51.428 ms
```

## Basic Commands & help

To display the list of the commands we can type `docker`

```bash
Management Commands:
  app*        Docker App (Docker Inc., v0.9.1-beta3)
  builder     Manage builds
  buildx*     Build with BuildKit (Docker Inc., v0.5.1-docker)
  config      Manage Docker configs
  container   Manage containers
  context     Manage contexts
  image       Manage images
  manifest    Manage Docker image manifests and manifest lists
  network     Manage networks
  node        Manage Swarm nodes
  plugin      Manage plugins
  scan*       Docker Scan (Docker Inc., v0.5.0)
  secret      Manage Docker secrets
  service     Manage services
  stack       Manage Docker stacks
  swarm       Manage Swarm
  system      Manage Docker
  trust       Manage trust on Docker images
  volume      Manage volumes

Commands:
  attach      Attach local standard input, output, and error streams to a running container
  build       Build an image from a Dockerfile
  commit      Create a new image from a container's changes
  cp          Copy files/folders between a container and the local filesystem
  create      Create a new container
  diff        Inspect changes to files or directories on a container's filesystem
  events      Get real time events from the server
  exec        Run a command in a running container
  export      Export a container's filesystem as a tar archive
  history     Show the history of an image
  images      List images
  import      Import the contents from a tarball to create a filesystem image
  info        Display system-wide information
  inspect     Return low-level information on Docker objects
  kill        Kill one or more running containers
  load        Load an image from a tar archive or STDIN
  login       Log in to a Docker registry
  logout      Log out from a Docker registry
  logs        Fetch the logs of a container
  pause       Pause all processes within one or more containers
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image or a repository from a registry
  push        Push an image or a repository to a registry
  rename      Rename a container
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Remove one or more images
  run         Run a command in a new container
  save        Save one or more images to a tar archive (streamed to STDOUT by default)
  search      Search the Docker Hub for images
  start       Start one or more stopped containers
  stats       Display a live stream of container(s) resource usage statistics
  stop        Stop one or more running containers
  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE
  top         Display the running processes of a container
  unpause     Unpause all processes within one or more containers
  update      Update configuration of one or more containers
  version     Show the Docker version information
  wait        Block until one or more containers stop, then print their exit codes
```

This list is composed of two parts:
--> Management Commands (list different Docker objects)
--> Commands (list every commands)

We can list the command that concern a specific Docker object adding the name of this object after the `docker command`. Enter `docker image` will show all the commands about images.

##### List entities

like on a linux system we can use the `ls` and `ls -a` commands to list entities.

`docker image ls` will list all images present locally

```bash
REPOSITORY    TAG       IMAGE ID       CREATED         SIZE
alpine        latest    28f6e2705743   2 weeks ago     5.61MB
hello-world   latest    bf756fb1ae65   14 months ago   13.3kB
```

`docker container ls` will list all container running

```bash
CONTAINER ID   IMAGE     COMMAND            CREATED        STATUS        PORTS     NAMES
8f7ecaf543f8   alpine    "ping google.fr"   12 hours ago   Up 12 hours             jovial_jennings
```

`docker container ls -a` will list all containers running or not

```bash
CONTAINER ID   IMAGE         COMMAND            CREATED        STATUS                      PORTS     NAMES
8f7ecaf543f8   alpine        "ping google.fr"   12 hours ago   Up 12 hours                           jovial_jennings
6e8e616f05c1   alpine        "ping google.fr"   12 hours ago   Exited (0) 12 hours ago               inspiring_jepsen
bfc02a59d1dd   alpine        "/bin/sh"          12 hours ago   Exited (0) 12 hours ago               nervous_clarke
cf50a31ec24e   alpine        "/bin/sh"          12 hours ago   Exited (0) 12 hours ago               loving_shtern
2999df98bd9c   alpine        "/bin/sh"          13 hours ago   Exited (0) 13 hours ago               fervent_murdock
221a5f2b17e3   alpine        "/bin/sh"          13 hours ago   Exited (0) 13 hours ago               amazing_liskov
7f85275382e6   alpine        "/bin/sh"          13 hours ago   Exited (127) 13 hours ago             serene_rosalind
459fb0ed52c3   alpine        "/bin/sh"          13 hours ago   Exited (0) 13 hours ago               practical_banach
ed74998d24d8   hello-world   "/hello"           14 hours ago   Exited (0) 14 hours ago               admiring_lewin
c091bf98a2af   hello-world   "/hello"           16 hours ago   Exited (0) 16 hours ago               strange_chatelet
78983cf4b0a2   hello-world   "/hello"           16 hours ago   Exited (0) 16 hours ago               lucid_gates
```

##### Delete entity

###### Images

To remove an entity we can use the `rm` command. We must provide either the `IMAGE ID` or the name of the image to specify which one we want to delete.

```bash
docker image rm 28f6e2705743
Error response from daemon: conflict: unable to delete 28f6e2705743 (cannot be forced) - image is being used by running container 8f7ecaf543f8
```

Note that we cannot delete an image that is used by a container. (We can force the deletion by using the `-f` option on `rm` but it can be risky for the container)

###### Containers

We can delete a container using the same command.

```bash
docker container rm 78983cf4b0a2
```

or we can delete all the containers that are not currently running.

```bash
~ % docker container prune
WARNING! This will remove all stopped containers.
Are you sure you want to continue? [y/N] y
Deleted Containers:
6e8e616f05c1677eb895ced24e38088662b0278f3c497ec90555fb9c7b7a69e2
bfc02a59d1ddac617559c6ad9c74bd6a7d2c12880e5d695f012586e677350ff3
cf50a31ec24e2f7586ea99f1e535922ffc24681ebf8c8f603fa39d90ec0ffa5c
2999df98bd9c0c53dded3ee37f5218de0d66e92f0abf52d24b78280d9026ea22
221a5f2b17e32773300f5bff34fc21e1b1925c1a940b040f89cdd6cf294ea252
7f85275382e6d5cad5f1ad3420b21c8d9ed71fecb9267ceaec55905b4bc1c8d3
459fb0ed52c31b79d503cd046c1bb61ffc0222ec305f38f582b4aaaf323375fb
ed74998d24d888aa3661ed8a10f0014bf0633504350f14efe40e933f9833b642
c091bf98a2af4d8cab6bff11b5f2bc4602fb00e10403ef602f7ab61461b9e9ff

Total reclaimed space: 21B
```

We can verify the deletion with :

```bash
~ % docker container ls -a
CONTAINER ID   IMAGE     COMMAND            CREATED        STATUS        PORTS     NAMES
8f7ecaf543f8   alpine    "ping google.fr"   12 hours ago   Up 12 hours             jovial_jennings
```

Now that we have delete all the containers who used the `hello-world` image we can delete the image.

```bash
~ % docker image rm hello-world
Untagged: hello-world:latest
Untagged: hello-world@sha256:7e02330c713f93b1d3e4c5003350d0dbe215ca269dd1d84a4abc577908344b30
Deleted: sha256:bf756fb1ae65adf866bd8c456593cd24beb6a0a061dedf42b26a993176745f6b
Deleted: sha256:9c27e219663c25e0f28493790cc0b88bc973ba3b1686355f221c38a36978ac63
```

```bash
~ % docker image ls
REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
alpine       latest    28f6e2705743   2 weeks ago   5.61MB
```

If we want to delete the container that is running we must add the `-f` option to force the deletion.

```bash
~ % docker container rm -f 8f7ecaf543f8
8f7ecaf543f8
```

We can have some help about a command by adding the `--help` option.

We can also use the `docker system prune` command to delete :

- All Containers that are not currently running
- All Networks that are not used by a running container
- All dangling images (image that are not described by a tag) that are not used for running a container
- All caches used for the creation of Docker images

we can add the `-a` option to delete moreover all taged images that are not used by a running container.

## Container LifeCycle

We saw that the `docker run`command creates and start a container but we can do these actions separately.

#### Create Container

`docker container create IMAGE_NAME` create a new container but it does not start it. It is usefull if we want configure the container.

```bash
~ % docker container create alpine
3bfd8cebb045b3517039eb2c208525d5ce809462724369a5f4b8454a391534f1
```

we can see the container with the `docker ps -a` command (alias for `docker container ls -a`). Its status is `CREATED`

```bash
~ % docker ps -a
CONTAINER ID   IMAGE     COMMAND     CREATED         STATUS    PORTS     NAMES
3bfd8cebb045   alpine    "/bin/sh"   6 seconds ago   Created             friendly_boyd
```

We can pass config options at the creation of the container. Here we create a new container from the "alpine" image in interactive mode with a terminal and we call it alpine1 and we

```bash
docker container create --name alpine1 -it  alpine
```

#### Start Container

Docker provides the `docker container start CONTAINER_NAME_OR_ID` to start a container already created.

The `start` command cannot change options passed at the creation of the container

If we create a container without `-it` option and we try to start it with -ai option it wont works.

The `-a` option (for `--attach`) attaches standard output (STDOUT) and error output (STDERR) to your terminal. In other words, this will display the output streams of your container in your terminal as if you were in the container.

The `-i` option for `--interactive` attaches the standard input (STDIN) of your terminal to the container. In other words, it allows you to type commands in your terminal as if you were in the container.

#### Stop a container

To stop a container we must use `docker scontainer stop` or `docker stop`

```bash
~ % docker create --name googlePing alpine ping google.com
4d9a72a2a5020ab41bcc9a7f6cfca62b76467af5e38a7df7d103d7b14a23c93b

~ % docker ps -a
CONTAINER ID   IMAGE     COMMAND             CREATED         STATUS    PORTS     NAMES
4d9a72a2a502   alpine    "ping google.com"   8 seconds ago   Created             googlePing
```

here I create a new container with the name "googlePing" that will execute the command `ping google.com`

then I can start it using either its name or its Id

```bash
~ % docker container start googlePing
googlePing
```

we can verify if the container is running

```bash
 ~ % docker ps
CONTAINER ID   IMAGE     COMMAND             CREATED          STATUS          PORTS     NAMES
4d9a72a2a502   alpine    "ping google.com"   10 minutes ago   Up 10 seconds             googlePing
```

finally we can stop the container.

```bash
~ % docker container stop googlePing
googlePing
```

:warning: In fact, `docker container stop` sends a **SIGTERM** to give the container time to perform any cleaning / backup tasks before shutting down.
If after a few seconds the container is still running, the daemon then sends a **SIGKILL** to the container to force its interruption
Here it is because the ping command does not have a code to respond to a **SIGTERM**.

#### Kill a container

We can also directly kill a process with `docker container kill` or `docker kill`.

this command will directly stop the container.

###### Kill all containers running

To kill all containers currently running we can type `docker stop &(docker container ls -aq)`.
this command will take the result of `docker container ls -aq` (a list of container ID) and will stop each container.

## Docker pause, unpause, exec and rename

#### pause and unpause

##### Pause

The `docker container pause NAME_OR_ID` command allows to suspend all the processes of one or more specified containers.

It actually uses the functionality of the Linux kernel of cgroup freezers which allows to suspend processes without sending signals (SIGSTOP).
This effectively allows the processes to be unable to react because no signal is being sent and to "freeze" them.

the `STATUS` of the container will stay "UP"

##### unpause

To stop the pause we need to use the `docker container unpause NAME_OR_ID` command.

#### Rename

It is possible to give a specific name at the creation of a container with the `--name` option but it is also possible to change the name after the creation.

To do this we will use the following command

```bash
docker container rename NAME_OR_ID newName
```

#### Exec

for executing commands in running containers we must use the `docker container exec COMMAND` command
`exec` can also take options like `-i` or `-t`.

:warning: `docker exec` works only on running containers

###### Exemple :

:arrow_down: start a new container redis called redis in background :arrow_down:

```bash
docker run -d --name redis redis
```

:arrow_down: execute a commande that run the redis CLI :arrow_down:

```bash
~ % docker exec -it redis redis-cli
127.0.0.1:6379> set name maxime
OK
127.0.0.1:6379> get name
"maxime"
127.0.0.1:6379>
```

###### Get a shell in any running container

To get a shell in any running container we can use the following commands :

- `docker exec -it NAME_OR_ID bash`
- `docker exec -it NAME_OR_ID sh` use sh if bash is not installed like in alpine distrib of linux

## copy files and inspect container

#### copy files

to copy a file we will use the `docker container cp source-path CONTAINER:destination-path` command
this command will works can import whether the container is running or not.

#### Inspect changes in file system

we can inspect the files that have been modified using the `docker container diff CONTAINER` command.

```bash
~ % docker run --name test -it alpine
/ # ls
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
/ # touch /home/logs.txt
/ # cd /home
/home # ls
logs.txt
/home # exit

~ % docker container diff test
C /root
A /root/.ash_history
C /home
A /home/logs.txt
```

- La lettre A signifie qu'un fichier ou un dossier a été ajouté.

- La lettre D signifie qu'un fichier ou un dossier a été supprimé.

- La lettre C signifie qu'un fichier ou un dossier a été modifié.
