# RabbitHole Task API viewer

An application built in react for interacting with the rabbithole task API.

## Description

Search for rabbithole user task data by entering an ethereum address or ENS name. Utilizes ethers.js to resolve ENS names into ethereum addresses and present the data in a way that is much easier to read and understand than raw JSON. Works for either ENS names or normal ethereum hexadecimal addresses beginning with "0x".

<div align="center"><img src="https://i.imgur.com/UHyGK37.png" height="360px" /></div>

### Key/Legend

  - ❌	❌ - Task has not been started
  - ✅	✅ - Task is both completed and redeemed
  - ✅	❌ - Task is completed, but not redeemed
  - ❌	✅ - Task has been redeemed, but there is an issue reading the progress
  - Disabled Tasks will show up with a red/pink background 
  <img src="https://i.imgur.com/S7gJvUP.png" width="66%" />
