import { generate } from '@graphql-codegen/cli'
import { host } from './constants/Host'

async function graphqlCodegen() {
    await generate(
        {
            schema: `http://${host}/graphql`,
            documents: './**/*.graphql',
            overwrite: true,
            generates: {
                ['./graphql/generated/graphql.tsx']: {
                    config: {
                        withHooks: true,
                    },
                    plugins: [
                        'typescript',
                        'typescript-operations',
                        'typescript-react-apollo',
                    ],
                },
            },
        },
        true
    )
}

graphqlCodegen()
