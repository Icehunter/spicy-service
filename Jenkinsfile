#!/usr/bin/env groovy

@Library(["spicy-automation@development"]) _

def ServiceName = "spicy-service";

spicyECSService(
  // account used for publishing/building docker images
  account: accounts.get().SPICY_US_EAST_1,
  buildCommand: { Map args ->
    sh "jenkins-hooks/build.sh ${dockerUtils.getContainerName(serviceName: ServiceName)}"
  },
  // deployment accounts
  devAccount: accounts.get().SPICY_US_EAST_1_DEV_PUBLIC,
  // sandboxAccount: accounts.get().SPICY_US_EAST_1_SANDBOX_PUBLIC,
  // stagingAccount: accounts.get().SPICY_US_EAST_1_STAGING_PUBLIC,
  // prodAccount: accounts.get().SPICY_US_EAST_1_PROD_PUBLIC,
  serviceName: ServiceName,
  clusterName: "spicy-ecs"
)
