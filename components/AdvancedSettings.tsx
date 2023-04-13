import styles from '../styles/Home.module.scss'
import { useState } from 'react';
export default function AdvancedSettings({sortFilterValues, sortParams, setSortParams}: {sortFilterValues: Array<string>, sortParams: Array<any>, setSortParams: any}) {
	const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
	return showAdvanced ? sortPanel(sortFilterValues, sortParams, setSortParams) :
	<div className={styles.sortPanel} onClick={()=>setShowAdvanced(true)}>Show Advanced Settings</div> 
}

function updateParam(oldParams: Array<any>, setParams: any, targetIdx: number){
	return (value: string) => {
		setParams(
			oldParams.map((p, i) => i === targetIdx ? {...p, param: value} : p )
		)
	}
}
function sortPanel(sortFilterValues: Array<string>, params: Array<any>, setParams: any){
	return <div className={styles.sortPanel}> 
	Sort by 
		{params.map((searchParam, idx) => {
			return <div key={`searchdropdown${idx}`}>
				{
					select(sortFilterValues, searchParam.param, updateParam(params, setParams, idx))
				}	
				<div className={styles.sortPanelButton} onClick={() => setParams(
					params.map((p, i) => i === idx ? {...p, inverted: !p.inverted} : p )
				)}> 
				{searchParam.inverted ? "↑ ":"↓"}</div>
				</div>
		})}
		</div>
}
function select(sortFilterValues : Array<string>, state: string, setState: any){
	return (
	<select value={state} onChange={ e => setState(e.target.value) }>
		{sortFilterValues.map((value: string) => (<option value={value} key={`${value}`}>{value}</option>))}
	</select> 
	)
}