## User

| Name           | Type     | Description           | Required |
|:---------------|:---------|:----------------------|:---------|
| `userId`       | `UUIDV4` | ID of member          | ✅        |
| `firstName`    | `STRING` | First Name of user    | ❌        |
| `lastName`     | `STRING` | First Name of user    | ❌        |
| `emailAddress` | `STRING` | Email address of user | ✅        |

## Group

| Name      | Type     | Description             | Required |
|:----------|:---------|:------------------------|:---------|
| `groupId` | `UUIDV4` | ID of group             | ✅        |
| `name`    | `STRING` | Name of group           | ✅        |
| `userId`  | `UUIDV4` | userId group belongs to | ✅        |

## Member

| Name              | Type      | Description                         | Required |
|:------------------|:----------|:------------------------------------|:---------|
| `memberId`        | `UUIDV4`  | ID of member                        | ✅        |
| `telephoneNumber` | `STRING`  | Phone number of member              | ✅        |
| `groupId`         | `UUIDV4`  | Group ID user belongs to            | ✅        |
| `firstName`       | `STRING`  | First Name of user                  | ❌        |
| `lastName`        | `STRING`  | First Name of user                  | ❌        |
| `optIn`           | `BOOLEAN` | User has agreed to receive messages | ✅        |
| `optOut`          | `BOOLEAN` | User has opted out of messages      | ✅        |
| `admin`           | `BOOLEAN` | User can send messages to group     | ✅        |

## Bandwidth Number

| Name                | Type      | Description                              | Required |
|:--------------------|:----------|:-----------------------------------------|:---------|
| `numberId`          | `UUIDV4`  | ID of phone number                       | ✅        |
| `bandwidthNumberId` | `STRING`  | ID of phone number in Bandwidth          | ✅        |
| `groupId`           | `UUIDV4`  | Group ID user phone number to            | ✅        |
| `forwardEnabled`    | `BOOLEAN` | Has phone number forwarding been enabled | ✅        |
| `forwardingNumber`  | `STRING`  | Phone number to forward incoming calls   | ❌        |

## Message

| Name                 | Type                | Description                        | Required |
|:---------------------|:--------------------|:-----------------------------------|:---------|
| `message_id`         | `UUIDV4`            | ID of message                      | ✅        |
| `bandwidthMessageId` | `STRING`            | Bandwidth ID                       | ✅        |
| `apiResposne`        | `JSONB`             | Response from Bandwidth API        | ❌        |
| `failed`             | `BOOLEAN`           | Outbound message success?          | ❌        |
| `direction`          | `ENUM('in', 'out')` | Direction of message `in` or `out` | ✅        |
| `date`               | `DATE`              | Date stamp of message              | ✅        |
| `memberId`           | `UUIDV4`            | Member ID message belongs to       | ✅        |
| `incomingCallback`   | `JSONB`             | Callback for incoming messages     | ❌        |
| `deliveredCallback`  | `JSONB`             | Callback for delivered messages    | ❌        |
| `failedCallback`     | `JSONB`             | Callback for failed messages       | ❌        |
