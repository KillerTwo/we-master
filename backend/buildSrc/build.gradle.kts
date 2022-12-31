/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    // Support convention plugins written in Kotlin. Convention plugins are build scripts in 'src/main' that automatically become available as plugins in the main build.
    `kotlin-dsl`
    id("org.springframework.boot") version "3.0.1"
}
/*apply(plugin = "io.spring.dependency-management")

tasks.named<org.springframework.boot.gradle.tasks.bundling.BootJar>("bootJar") {
    mainClass.set("org.wm.WebAppApplication")
}*/

repositories {
    maven {
        url = uri("https://plugins.gradle.org/m2/")
    }
    // Use the plugin portal to apply community plugins in convention plugins.
    gradlePluginPortal()
}
dependencies {
    implementation("org.springframework.boot:spring-boot-gradle-plugin:3.0.1")
}