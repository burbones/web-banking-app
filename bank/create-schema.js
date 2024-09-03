const permify = require("@permify/permify-node");

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
});

const schema = "entity user {} \n\nentity organization {\n    relation admin @user    \n    relation member @user\n        \n    permission view_fox = admin\n}";

let schemaVersion = undefined;

const initAuthorizationSchema = async () => {
    const schemaWriteRequest = new permify.grpc.payload.SchemaWriteRequest();
    schemaWriteRequest.setTenantId("t1");
    schemaWriteRequest.setSchema(schema);
    
    const res = await client.schema.write(schemaWriteRequest);
    return res.u[0];
}

module.exports = initAuthorizationSchema;