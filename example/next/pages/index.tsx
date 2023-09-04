/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-duplicate-disable */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-inner-declarations */
import { Button, Center, HStack, Spacer, Stack, Text } from "@chakra-ui/react";
import { getWallet, useAccount, WalletType } from "graz";
import Long from "long";
import type { NextPage } from "next";
import { BalanceList } from "ui/balance-list";
import { ChainSwitcher } from "ui/chain-switcher";
import { ConnectButton } from "ui/connect-button";
import { ConnectStatus } from "ui/connect-status";
import { RecentChain } from "ui/recent-chain";
import { ToggleTheme } from "ui/toggle-theme";

const HomePage: NextPage = () => {
  const { data: accountData, isConnecting, isReconnecting } = useAccount();

  const wallet = getWallet(WalletType.METAMASK_SNAP_LEAP);

  const signAmino = async () => {
    let res;
    try {
      res = await wallet.getKey("osmosis-1");
    } catch (err) {
      console.error({ getKeyError: err });
      return null;
    }
    console.log({ getKey: res });
    let res1;
    try {
      res1 = await wallet.signAmino(
        "osmosis-1",
        res.bech32Address,
        {
          chain_id: "osmosis-1",
          account_number: "570559",
          sequence: "1234567",
          msgs: [],
          memo: "hello world",
          fee: { amount: [{ amount: "1000", denom: "uosmo" }], gas: "123456" },
        },
        {},
      );
    } catch (err) {
      console.error({ signAmino: err });
    }
    console.log({ signAmino: res1 });
  };

  const getOfflineSigner = async () => {
    let res;
    try {
      res = await wallet.getKey("osmosis-1");
    } catch (err) {
      console.error({ getKeyError: err });
      return null;
    }
    console.log({ getKey: res });
    let res1;
    try {
      res1 = wallet.getOfflineSigner("osmosis-1");
      res1 = await res1.signAmino(res.bech32Address, {
        chain_id: "osmosis-1",
        account_number: "570559",
        sequence: "1234567",
        msgs: [],
        memo: "hello world",
        fee: { amount: [{ amount: "1000", denom: "uosmo" }], gas: "123456" },
      });
    } catch (err) {
      console.error({ getOfflineSigner: err });
    }
    console.log({ getOfflineSigner: res1 });
  };

  const suggestChain = async (incorrectChainId: boolean = false) => {
    let res1;
    try {
      const chainInfo = {
        chainId: "random-id-123",
        chainName: "Random Name",
        rpc: "rpcEndpoint",
        rest: "restEndpoint",
        bip44: {
          coinType: !incorrectChainId ? 118 : 60,
        },
        bech32Config: {
          bech32PrefixAccAddr: "rnd",
          bech32PrefixAccPub: `rndpub`,
          bech32PrefixValAddr: `rndvaloper`,
          bech32PrefixValPub: `rndvaloperpub`,
          bech32PrefixConsAddr: `rndvalcons`,
          bech32PrefixConsPub: `rndvalconspub`,
        },
        currencies: [
          {
            coinDenom: "RANDOM",
            coinMinimalDenom: "urandom",
            coinDecimals: 7,
            coinGeckoId: "",
          },
        ],
        feeCurrencies: [
          {
            coinDenom: "RANDOM",
            coinMinimalDenom: "urandom",
            coinDecimals: 7,
            coinGeckoId: "",
            gasPriceStep: {
              low: 0.5,
              average: 0.5,
              high: 0.5,
            },
          },
        ],
        stakeCurrency: {
          coinDenom: "RANDOM",
          coinMinimalDenom: "urandom",
          coinDecimals: 7,
          coinGeckoId: "",
          gasPriceStep: 0.5,
        },
        image: "",
      };
      res1 = await wallet.experimentalSuggestChain(chainInfo);
    } catch (err) {
      console.error({ getOfflineSignerError: err });
    }
    console.log({ getOfflineSigner: "success" });
  };

  const signDirect = async () => {
    let res;
    try {
      res = await wallet.getKey("osmosis-1");
    } catch (err) {
      console.error({ getKeyError: err });
      return null;
    }
    console.log({ getKey: res });
    let res1;
    try {
      res1 = await wallet.signDirect(
        "osmosis-1",
        res.bech32Address,
        {
          chainId: "osmosis-1",
          accountNumber: new Long(1697478, 0, false),
          authInfoBytes: new Uint8Array([
            10, 80, 10, 70, 10, 31, 47, 99, 111, 115, 109, 111, 115, 46, 99, 114, 121, 112, 116, 111, 46, 115, 101, 99,
            112, 50, 53, 54, 107, 49, 46, 80, 117, 98, 75, 101, 121, 18, 35, 10, 33, 2, 159, 1, 105, 211, 58, 166, 136,
            59, 102, 89, 119, 185, 105, 15, 213, 34, 249, 236, 230, 0, 56, 182, 41, 39, 245, 250, 142, 238, 87, 246, 53,
            223, 18, 4, 10, 2, 8, 1, 24, 22, 18, 19, 10, 13, 10, 5, 117, 97, 116, 111, 109, 18, 4, 51, 49, 57, 57, 16,
            219, 194, 19,
          ]),
          bodyBytes: new Uint8Array([
            10, 154, 1, 10, 35, 47, 99, 111, 115, 109, 111, 115, 46, 115, 116, 97, 107, 105, 110, 103, 46, 118, 49, 98,
            101, 116, 97, 49, 46, 77, 115, 103, 68, 101, 108, 101, 103, 97, 116, 101, 18, 115, 10, 45, 99, 111, 115,
            109, 111, 115, 49, 50, 55, 106, 101, 120, 100, 104, 53, 106, 120, 53, 116, 100, 113, 120, 116, 54, 122, 54,
            100, 103, 103, 102, 114, 53, 99, 54, 102, 102, 99, 119, 117, 97, 109, 115, 116, 112, 101, 18, 52, 99, 111,
            115, 109, 111, 115, 118, 97, 108, 111, 112, 101, 114, 49, 108, 99, 119, 120, 117, 53, 48, 114, 118, 118,
            103, 102, 57, 118, 54, 106, 121, 54, 113, 53, 109, 114, 122, 121, 104, 108, 115, 122, 119, 116, 106, 120,
            104, 116, 115, 99, 109, 112, 26, 12, 10, 5, 117, 97, 116, 111, 109, 18, 3, 49, 48, 48,
          ]),
        },
        {},
      );
    } catch (err) {
      console.error({ signDirect: err });
    }
    console.log({ signDirect: res1 });
  };

  return (
    <Center minH="100vh">
      <Stack bgColor="whiteAlpha.100" boxShadow="md" maxW="md" p={4} rounded="md" spacing={4} w="full">
        <HStack>
          <ConnectStatus />
        </HStack>
        {!accountData && (isConnecting || isReconnecting) ? <RecentChain /> : null}
        {accountData ? (
          <>
            <Text>
              Wallet name: <b>{accountData.name}</b>
            </Text>
            <Text noOfLines={1} wordBreak="break-all">
              Wallet address: <b>{accountData.bech32Address}</b>
            </Text>

            <BalanceList />
            <ChainSwitcher />
            <Button onClick={() => signDirect()}>GetKey + SignDirect</Button>
            <Button onClick={() => signAmino()}>GetKey + signAmino</Button>
            <Button onClick={() => getOfflineSigner()}>GetKey + getOfflineSigner</Button>
            <Button onClick={() => suggestChain()}>suggestChain</Button>
            <Button onClick={() => suggestChain(true)}>suggestChain (incorrect coinType) </Button>
          </>
        ) : null}
        <HStack align="end" pt={4}>
          <ToggleTheme />
          <Spacer />
          <ConnectButton />
        </HStack>
      </Stack>
    </Center>
  );
};

export default HomePage;
