import { Code, Text } from '@mantine/core'
import { toastSuccess, UiCard, UiInfo, UiStack } from '@pubkey-ui/core'
import { VanityKeypairResult } from '@solana-keygen-worker/generate-vanity-keypair'
import { useEffect, useState } from 'react'
import { KeypairTable } from './keypair-table'
import { SearchForm } from './search-form'
import { text } from 'stream/consumers'
import { fontSizeResolver } from '@mantine/core/lib/core/Box/style-props/resolvers/font-size-resolver/font-size-resolver'

export function GrindKeypairFeature({
  grind,
}: {
  grind: ({ startsWith }: { startsWith: string }) => Promise<VanityKeypairResult>
}) {
  const [loading, setLoading] = useState(false)
  const [results, setResult] = useState<VanityKeypairResult[]>([])
  const [startsWith, setStartsWith] = useState('')
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    if (!startsWith.length) {
      return
    }
    setLoading(true)
    grind({ startsWith })
      .then((result) => {
        setResult([result, ...results])
        toastSuccess({
          title: 'New Keypair Found',
          message: `${result.publicKey} took ${result.duration}ms`,
        })
      })
      .finally(() => setLoading(false))
  }, [startsWith, trigger])
  
  return (
    <UiStack gap="xl" my="lg">
      {/* <UiInfo */}
        {/* message={ */}
          <UiStack style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 'xxx-large'}}>keypair generator in browser</Text>
            <Text>
              Write prefixes that you would like to find.
            </Text>
            <Text>
              3 letter prefixes are found very fast. 4+ letters might take up to an hour, depending on your hardware.
            </Text>
            <Text>
              After generation, copy the public key and private key or download the file which saved private key.
            </Text>
          </UiStack>
        {/* }> */}
      {/* </UiInfo> */}
      <UiCard title="Generate keypair">
        <UiStack gap="xl" my="lg">
          <SearchForm
            startsWith={startsWith}
            submit={(value) => {
              if (value === startsWith && results.length) {
                setTrigger((prev) => !prev)
              } else {
                setStartsWith(value)
              }
            }}
            loading={loading}
          />

          {results.length ? <KeypairTable results={results} /> : null}
        </UiStack>
      </UiCard>
    </UiStack>
  )
}
