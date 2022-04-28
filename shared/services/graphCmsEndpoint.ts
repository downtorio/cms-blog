export const validateGraphCmsEndpoint = () => {
	if (process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT)
		return process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT
	else
		throw new Error('Attempt to query your request failed. Please check your request endpoint and try again.')
}