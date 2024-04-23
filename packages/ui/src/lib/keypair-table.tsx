import { Code, Group, Table, Button } from '@mantine/core'
import { UiCopy } from '@pubkey-ui/core'
import { VanityKeypairResult } from '@solana-keygen-worker/generate-vanity-keypair'
import fileDownload from 'js-file-download'

export function KeypairTable({ results }: { results: VanityKeypairResult[] }) {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Public Key</Table.Th>
          <Table.Th>Private Key</Table.Th>
          <Table.Th style={{ textAlign: 'right' }}>Iterations</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {results.map((result) => (
          <Table.Tr key={result.publicKey}>
            <Table.Td>
              <Group gap="xs" align="center">
                <Code>{result.publicKey}</Code>
                <UiCopy text={result.publicKey} tooltip="Copy Public Key" />
              </Group>
            </Table.Td>
            <Table.Td>
              <Button
                style={{width: "52%"}}
                type="submit"
                fullWidth
                onClick={() => fileDownload('[' + result.secretKey.toLocaleString() + ']', `${result.publicKey}.json`)}
                mr={6}
              >
                Download
              </Button>
              <UiCopy text={`[${result.secretKey?.join(',')}]`} tooltip="Copy Private Key" />
            </Table.Td>
            <Table.Td style={{ textAlign: 'right' }}>
              {result.iterations} iterations took {result.duration}ms
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  )
}
