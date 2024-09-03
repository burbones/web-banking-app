const Errors = require('../constants/errors.js');
const permify = require('@permify/permify-node');

const client = new permify.grpc.newClient({
    endpoint: `${process.env.PERMIFY_HOST}:${process.env.PERMIFY_GRPC_PORT}`,
  });

const checkPermissions = (permissionType) => {
    return async (req, res, next) => {
        try {
            // Convert permissionType to string if necessary
            const permTypeString = String(permissionType);

            // Create and set the PermissionCheckRequest
            let permissionCheckRequest = new permify.grpc.payload.PermissionCheckRequest();
            permissionCheckRequest.setTenantId("t1");
            let metadata = new permify.grpc.payload.PermissionCheckRequestMetadata();
            metadata.setDepth(20);
            metadata.setSchemaVersion('');
            metadata.setSnapToken('');
            permissionCheckRequest.setMetadata(metadata);

            // Set the entity details
            let permissionCheckRequestEntity = new permify.grpc.payload.Entity();
            permissionCheckRequestEntity.setType("organization");
            permissionCheckRequestEntity.setId("1");
            permissionCheckRequest.setEntity(permissionCheckRequestEntity);

            // Set the permission to check
            permissionCheckRequest.setPermission(permTypeString);

            // Set the subject details
            let permissionCheckRequestSubject = new permify.grpc.payload.Subject();
            permissionCheckRequestSubject.setType("user");
            permissionCheckRequestSubject.setId(req.email);
            permissionCheckRequest.setSubject(permissionCheckRequestSubject);

            // Perform the permission check
            client.permission.check(permissionCheckRequest).then((response) => {
                if (response.u[0] === permify.grpc.base.CheckResult.CHECK_RESULT_ALLOWED) {
                    console.log("RESULT_ALLOWED")
                } else {
                    console.log(response);
                    console.log("RESULT_DENIED")
                }
            });

            // Prepare data for Permify check request
            // const checkRes = await client.permission.check({
            //     tenantId: 't1',
            //     metadata: {
            //         schemaVersion: '',
            //         snapToken: '',
            //         depth: 20,
            //     },
            //     entity: {
            //         type: 'organization',
            //         id: "1",
            //     },
            //     permission: permTypeString, // Use the converted permissionType
            //     subject: {
            //         type: 'user',
            //         id: req.email,
            //     },
            // });

            // if (checkRes.can === 1) {
            //     // If user is authorized
            //     req.authorized = 'authorized';
            //     console.log("authorized!");
            // } else {
            //     // If user is not authorized
            //     req.authorized = 'not authorized';
            //     console.log("not authorized!");
            // }
            next();
        } catch (err) {
            console.log(err);
            res.status(500).json( {error: Errors.SERVER_ERROR});
        }
    }
}

module.exports = checkPermissions;