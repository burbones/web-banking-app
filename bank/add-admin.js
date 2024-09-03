const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
});

let snapToken = undefined;

const addAdmin = async () => {
    // Create and set the RelationshipWriteRequest
    let relationshipWriteRequest = new permify.grpc.payload.DataWriteRequest();
    relationshipWriteRequest.setTenantId("t1");
    let metadata = new permify.grpc.payload.DataWriteRequestMetadata();
    metadata.setSchemaVersion("");
    relationshipWriteRequest.setMetadata(metadata);

    // Create the tuple list
    let tupleList = [];
    let tuples = [{
            entity: {
                type: "organization",
                id: "1"
            },
            relation: "admin",
            subject: {
                type: "user",
                id: "asd3@coolmail.org123"
            }
        }];

    tuples.forEach(t => {
        let tuple = new permify.grpc.payload.Tuple();

        let entity = new permify.grpc.payload.Entity();
        entity.setType(t.entity.type);
        entity.setId(t.entity.id);

        let subject = new permify.grpc.payload.Subject();
        subject.setType(t.subject.type);
        subject.setId(t.subject.id);

        tuple.setEntity(entity);
        tuple.setRelation(t.relation);
        tuple.setSubject(subject);

        tupleList.push(tuple);
    });

    relationshipWriteRequest.setTuplesList(tupleList);

    const res = await client.data.write(relationshipWriteRequest);
    console.log("Admin written!");
    return res.u[0];

}

module.exports = addAdmin;