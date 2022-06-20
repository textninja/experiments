# k8scron

This "experiment" is actually just a quick practice session; I'm practicing
running cron jobs in kubernetes.

The challenge I've contrived for the above is to create a service that writes a
file to cloud storage every day at 12pm. The file name will be the current date
and the contents will always be the same: "Hello from k8s!"

This project needs environment variables to run locally, and secrets configured
to run in kubernetes. See `container/.env.example` for a list of environment
variables to configure, and `deployment/cron.yaml.template` for details about
secrets.
