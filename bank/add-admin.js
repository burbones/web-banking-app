const permify = require("@permify/permify-node");
const User = require("./models/User");
const Errors = require("./constants/errors");
const logger = require("./utils/logger");
const { encrypt } = require("./constants/constants");

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
});

const addAdmin = async () => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error(Errors.CONFIG_ERROR + " " + "admin credentials");
    }

    const adminExists = await User.find({email: adminEmail});
    if (adminExists.length === 0) {
        const adminUser = new User({
            email: adminEmail,
            hashedPassword: await encrypt(adminPassword),
            balance: 0,
            phone: 0,
            isActive: true,
        });

        const adminUserFull = await adminUser.save();

        logger.info({admin: adminUserFull}, "Admin user was created");
    }

    await addAdminRole(adminEmail);
    logger.info({adminEmail}, "Admin role was granted");
}

const addAdminRole = async (adminEmail) => {
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
                id: adminEmail
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

    await client.data.write(relationshipWriteRequest);
}

module.exports = addAdmin;