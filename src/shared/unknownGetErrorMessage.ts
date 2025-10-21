const unknownGetErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }
  return undefined
}

export default unknownGetErrorMessage
