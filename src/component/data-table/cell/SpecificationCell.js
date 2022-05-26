import React, { useEffect } from "react";
import {GiPalmTree} from 'react-icons/gi';
import {BiPlusMedical} from 'react-icons/bi';
import {ImAirplane} from 'react-icons/im';
import {VscRemoteExplorer} from 'react-icons/vsc';

function SpecificationCell(props) {

	function setSpecification() {

		switch (props.details) {
			case 5:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-active"/> </td>;
			case 2:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-active"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 3:
				return <td><GiPalmTree className="specs-active"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 4:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane  className="specs-active"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			case 1:
				return <td><GiPalmTree className="specs-inactive"/> <BiPlusMedical className="specs-inactive"/> <ImAirplane className="specs-inactive"/> <VscRemoteExplorer className="specs-inactive"/> </td>;
			default:
				break;
		}
	}

	return (
		setSpecification()
	);
}

export default SpecificationCell;
