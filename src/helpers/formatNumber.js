export default function formatNumber(value) {
	return new Intl.NumberFormat(value).format(value)
}