/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    id("org.wm.java-conventions")
}

dependencies {
    api("org.springframework.boot:spring-boot-starter-security")
    api("org.apache.commons:commons-lang3:3.12.0")
    api("io.jsonwebtoken:jjwt:0.9.1")
    testImplementation("org.springframework.security:spring-security-test:5.6.3")
}

description = "核心模块"