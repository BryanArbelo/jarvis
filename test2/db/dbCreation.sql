CREATE TABLE Clients (
 clientId text PRIMARY KEY,
 firstName text,
 lastName text
);

CREATE TABLE Orders (
 clientId text PRIMARY KEY,
 CONSTRAINT clientId FOREIGN KEY (clientId)
      REFERENCES Clients (clientId) MATCH SIMPLE,
 orderId text,
 request text,
 duration numeric 
);

/*insert default client*/
INSERT INTO Clients (clientId,firstName,lastName)
    VALUES ('client-321','bryan','arbelo');