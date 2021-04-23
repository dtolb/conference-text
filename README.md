<div align="center">

# conference-text

<a href="http://dev.bandwidth.com"><img src="https://s3.amazonaws.com/bwdemos/BW-VMP.png"/></a>
</div>

Let the conference organizer message the team with updates


## Prereqs

This app assumes a least a mild understanding of the following:

* [NodeJS](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Bandwidth](https://bandwidth.com/)
* [Git](https://git-scm.com/)

## Text-flow

![Text-flow](Conference-Text_Flow.png)

## Overview

### Create a "group"

Groups need a list of:
* admins consistenting of
    - "Name"
    - "Phone Number"
* attendees consistenting of
    - "username" (`dtolbert` or something similar)
    - "Phone Number"

On group creation send an introduction text:
* as a "group" message to all the admins
* as an individual sms (will need to iterate each) to the attende

### On inbound message

* Check the `from` number to find in a group
  - If not in a group, just ignore the inbound sms
* If the `from` number is an attendee 
  - Check the text for `stop` if there, then remove them from the group
  - prepend the `username` to the message
  - forward the message as a group message to the admins
* If the `from` number is an admin
  - Check the first character for `#` or `@` otherwise it's intended as a message for just the other admins to see
* if the first character is an `@` the message is intended for a **SPECIFIC** attendee
  - message should be like `@dtolbert food is at a 11`
  - look up the user's phone number in the group by username
  - send **ONLY** the message after the `@dtolbert` to only that phone number
* if the first character is an `#` the message is intended for **ALL** attendees
  - message should be like `# hey all, need you to be at the booth by 11`
  - look up the list of attendees phonenumbers'
  - iterate over the list and send **ONLY** the message after the `#`

### All together

* Admins can message each other in a group sms without attendees receiving the message unless the message is prefixed with a:
  - `#` to send to **ALL** Attendees
  - `@{username}` to send to a specific attendee
* Attendees can message to the number to ask questions of admins
* Attendees can receive messages from the number with updates either to the whole group or just themselves

### Admin view

![image](https://user-images.githubusercontent.com/6805534/115922788-532ea380-a44b-11eb-99a5-440a30ecb282.png)

### Attendee View

![image](https://user-images.githubusercontent.com/6805534/115922976-90933100-a44b-11eb-937b-56ba162fe13a.png)
