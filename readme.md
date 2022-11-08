
# bcrypt - for hashing password

# 01-Mongo Schema instance method

 Schema.methods.methodName = function(){
  <!-- can access the schema data by this keyword -->
  return this.name
 }

# 02-generate token from Schema

# 03 - login work flow
  -check email and password.
  ## compare password with schema methods.
    --if does match.
    -- then send token
# now we had jwt token
  -- we can access the routes via it.

#### validation
 -duplicate mail validation.
 -