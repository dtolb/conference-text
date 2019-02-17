## Users

| Name            | Type     | Description              | Required |
|:----------------|:---------|:-------------------------|:---------|
| `user_id`       | `UUIDV4` | ID of member             | ✅        |
| `group_id`      | `UUIDV4` | Group ID user belongs to | ✅        |
| `first_name`    | `STRING` | First Name of user       | ❌        |
| `last_name`     | `STRING` | First Name of user       | ❌        |
| `email_address` | `STRING` | Email address of user    | ✅        |

## Group

| Name       | Type     | Description              | Required |
|:-----------|:---------|:-------------------------|:---------|
| `group_id` | `UUIDV4` | ID of group              | ✅        |
| `name`     | `STRING` | Name of group            | ✅        |
| `user_id`  | `UUIDV4` | User_Id group belongs to | ✅        |

## Members

| Name               | Type      | Description                         | Required |
|:-------------------|:----------|:------------------------------------|:---------|
| `member_id`        | `UUIDV4`  | ID of member                        | ✅        |
| `telephone_number` | `STRING`  | Phone number of member              | ✅        |
| `group_id`         | `UUIDV4`  | Group ID user belongs to            | ✅        |
| `first_name`       | `STRING`  | First Name of user                  | ❌        |
| `last_name`        | `STRING`  | First Name of user                  | ❌        |
| `opt_in`           | `BOOLEAN` | User has agreed to receive messages | ✅        |
| `out_out`          | `BOOLEAN` | User has opted out of messages      | ✅        |
| `admin`            | `BOOLEAN` | User can send messages to group     | ✅        |

## Bandwidth Numbers

| Name                  | Type      | Description                              | Required |
|:----------------------|:----------|:-----------------------------------------|:---------|
| `number_id`           | `UUIDV4`  | ID of phone number                       | ✅        |
| `bandwidth_number_id` | `STRING`  | ID of phone number in Bandwidth          | ✅        |
| `group_id`            | `UUIDV4`  | Group ID user phone number to            | ✅        |
| `forward_enabled`     | `BOOLEAN` | Has phone number forwarding been enabled | ✅        |
| `forwarding_number`   | `STRING`  | Phone number to forward incoming calls   | ❌        |

## Messages

| Name                   | Type                | Description                        | Required |
|:-----------------------|:--------------------|:-----------------------------------|:---------|
| `message_id`           | `UUIDV4`            | ID of message                      | ✅        |
| `bandwidth_message_id` | `STRING`            | Bandwidth ID                       | ✅        |
| `api_resposne`         | `JSONB`             | Response from Bandwidth API        | ❌        |
| `failed`               | `BOOLEAN`           | Outbound message success?          | ❌        |
| `direction`            | `ENUM('in', 'out')` | Direction of message `in` or `out` | ✅        |
| `date`                 | `DATE`              | Date stamp of message              | ✅        |
| `group_id`             | `UUIDV4`            | Group ID message belongs to        | ✅        |
| `member_id`            | `UUIDV4`            | Member ID message belongs to       | ✅        |
| `incoming_callback`    | `JSONB`             | Callback for incoming messages     | ❌        |
| `delivered_callback`   | `JSONB`             | Callback for delivered messages    | ❌        |
| `failed_callback`      | `JSONB`             | Callback for failed messages       | ❌        |






