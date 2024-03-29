# Intern_Project

## Models

### dependencies Used:

&nbsp;&nbsp;&nbsp;&nbsp;1."express": "^4.18.2" (RESTAPI)
&nbsp;&nbsp;&nbsp;&nbsp;2."mongoose": "^8.1.3" (DATABASE)
&nbsp;&nbsp;&nbsp;&nbsp;"3."nodemon": "^3.0.3" (EASY NODE)

###

### Item fields

&nbsp;&nbsp;&nbsp;&nbsp;id : a unique identifier<br>
&nbsp;&nbsp;&nbsp;&nbsp;name : name of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;description : a description of the item<br>
&nbsp;&nbsp;&nbsp;&nbsp;quantity: the quantity of the item in the inventory with the same name<br>
&nbsp;&nbsp;&nbsp;&nbsp;timestamp : the lastly updated timestamp (it is generated in the backend)<br>

### Transaction fields

&nbsp;&nbsp;&nbsp;&nbsp;id: a unique identifier (different from item id)<br>
&nbsp;&nbsp;&nbsp;&nbsp;item_id : item id<br>
&nbsp;&nbsp;&nbsp;&nbsp;type : transaction happened in or out<br>
&nbsp;&nbsp;&nbsp;&nbsp;quantity : no.of items involed in the transaction<br>
&nbsp;&nbsp;&nbsp;&nbsp;timestamp : the timestamp at which the transaction occured (it is generated in the backend)<br>

### Validations Rules<br>

Validations are checked by the server and if any incorrect format
is send then a json object is sent to the clint such as {"message":"validation"}

<center><h2>Methods involving Item</h2></center>

<br>

#### GET /items

<hr>

```
Use Case :
    Gets all items from the inventory as a list of json objects
```

<br>

#### POST /items

<hr>

```
Use Case :
    to add a single item in the inventory
this transaction is recored automatically in the inventory

How to use :
    with the api endpoint in the url
    send a body with a json object which includes fields such as:
        1.name
        2.description

Validations :
    1.quantity must be a non-negative integer (sends "invalid value" message)

```

<br>

#### GET /items/:id

<hr>

```
Use Case:
    to get a single item from the inventory

Validations :
    1.id in the url must be a mangodbID
    and it should persist in the inventory (sends "invalid id" message)

```

<br>

#### PUT /items/:id

<hr>

```
Use Case :
    to update the item in the inventory
    this transaction is recored automatically in the inventory

How to Use :
    The body object should include fields such as name, description,quantity
    since this is a "PUT" method all the fields should be included,
    in case of "PATCH" method only partial fields can be include

Validations :
    1.id in the url must be a mangodbID
    and it should persist in the inventory (sends "invalid id" message)
    2.quantity must be a non negitive integer (sends "invalid value" message)
```

<br>

#### DELETE /items/:id

<hr>

```
Use Case:
    to delete the item in the inventory by the id
    this transaction is recored automatically in the inventory

Validations :
    1.id in the url must be a mangodbID
    and it should persist in the inventory (sends "invalid id" message)
```

<br>

<center><h2>Methods involving transactions</h2></center>

<br>

#### POST /items/:id/transactions

<hr>

```
Use Case:
    to add the transaction into the inventory

How to use :
    the id in the url persisting in the inventory in optional
    the body object must include fields
        1.type
        2.quantity

Validations :
    1.id in the url must be a mangodbID
    and it should persist in the inventory (sends "invalid id" message)
    2.type must be either "IN" or "OUT"
    (sends "type should be either IN or OUT" message)
```

<br>

#### GET /items/:id/transactions

<hr>

```
Use Case:
    to get all the transactions that include this id

Validations :
    1.id in the url must be a mangodbID
    and it should persist in the inventory (sends "invalid id" message)
```

### note:-

#### ( if none of the end points match the api will send endpoint not found )

#### ( POST, PUT, DELETE methods are being considered as transactions)

#### (while creating or deleting an item...

#### quantities of other items with the same name will get

#### incremented or decremented by 1 respectively)

### i have done this version cause i thought id cant be same with two objects

### so this is a version which holds no.of items with same name as quantity

### if this is not prefered then the version which quantities are as id which

### is usually one and doesnt update much is in branch "previous"
