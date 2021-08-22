import axios from 'axios'
import React from 'react'
import { slots } from './Slots'
export default function Analytics() {
	const todayDataURL = 'http://www.aideindustries.tk:5000/today'
	const weekDataURL = 'http://www.aideindustries.tk:5000/week'
	const averageURL = 'http://www.aideindustries.tk:5000/avrg/'

	async function getHighSaturatedOnions(url) {
		let dataOfOnionsToday
		try {
			const response = await axios.get(url)
			dataOfOnionsToday = response.data.data
		} catch (error) {
			console.error(error)
		}

		const highSaturatedOnions = await dataOfOnionsToday.filter(onion => {
			const firstLevelSaturationTrashHold = 150
			const onionSaturationValid =
				onion.Saturation !== 0 && onion.Saturation.includes('%')
			if (onionSaturationValid) {
				const saturationNumber = +onion.Saturation.split('%').join('')
				if (saturationNumber > firstLevelSaturationTrashHold) {
					return onion
				}
			}
		})

		return highSaturatedOnions
	}

	async function getAverageOnionsSlotSaturation(onion) {
		const averageOnionSaturation = await axios.get(`${averageURL}${onion}`)
		return averageOnionSaturation.data
	}

	async function getSatReport(slotStart, slotEnd) {
		const todaySaturatedOnions = await getHighSaturatedOnions(todayDataURL)
		const weekSaturatedOnions = await getHighSaturatedOnions(weekDataURL)
		console.log(todaySaturatedOnions, weekSaturatedOnions)

		const namesOfTodaysSaturatedOnions = todaySaturatedOnions.filter(onion =>
			\
		)
	}
	getSatReport(1, 2)

	return (
		<div>
			<form action="#">
				<select name="slotSelector" id="1">
					{slots.map((slot, id) => (
						<option value={slot} key={id}>
							{slot}
						</option>
					))}
				</select>
				<select name="slotSelector" id="1">
					{slots.map((slot, id) => (
						<option value={slot} key={id}>
							{slot}
						</option>
					))}
				</select>
				<button
					onClick={e => {
						e.preventDefault()
					}}
				>
					Get report
				</button>
			</form>
		</div>
	)
}
