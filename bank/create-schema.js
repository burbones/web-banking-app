const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
});

const schema = "entity user {}\n\nentity organization {\n\n    // organizational roles\n    relation admin @user\n    relation member @user\n\n    permission view_users = admin\n    permission view_all_transactions = admin\n    permission delete_user = admin\n}";

const initAuthorizationSchema = async () => {
    const schemaWriteRequest = new permify.grpc.payload.SchemaWriteRequest();
    schemaWriteRequest.setTenantId("t1");
    schemaWriteRequest.setSchema(schema);
    
    await client.schema.write(schemaWriteRequest);
}

module.exports = initAuthorizationSchema;