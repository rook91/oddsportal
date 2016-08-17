'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
/*
* Accordion component
* display main info about matches
*/
import Accordion from './js/components/accordion/Accordion'
//-------------------------------CSS/LESS
import './css/bootstrap.min.css';
import './less/main.less';

/*
-------------------------http://services.eoddsmaker.net/-------------------------
 <markets DT="GENERATION_DATETIME" CNT="EVENTS_COUNT">
 <S I="SPORT_ID" N="SPORT_NAME">
    <C I="REGION_ID" N="REGION_NAME">
        <L I="LEAGUE_ID" N="LEAGUE_NAME">
            <E I="EVENT_ID" DT="EVENT_DATETIME" T1="TEAM1_NAME" T2="TEAM2_NAME" T1I="TEAM1_ID" T2I="TEAM2_ID" BKS="NUMBER_OF_BOOKIES" >
                <M K="MARKET_CODE" N="MARKET_NAME">
                    <B I="BOOKMAKER_ID" BTDT="BOT_DATE" ISLOCKED="0|1">
                        <O N="ODD_NAME" V="ODD_VALUE" ISLOCKED="0|1"/>
                    </B>
                </M>
            </E>
        </L>
    </C>
 </S>
*/

import eoddsmaker from './eoddsmaker_sampleData.json';

(function () {
    var parser = function(pData){
        return pData.map(function(pItem, pKey){
            var childs;
            if (Array.isArray(pItem['C'])){
                childs = pItem['C'].map(function(pItem, pKey){
                    return {
                        id: pItem['@I'],
                        header: pItem['@N'],
                        children: []
                    }
                });
            } else {
                childs = {
                    id: pItem['C']['@I'],
                    header: pItem['C']['@N'],
                    children: []
                }
            }
            return {
                id: pItem['@I'],
                header: pItem['@N'],
                children: childs
            }
        });
    };

    console.log(parser(eoddsmaker.markets.S));
    ReactDOM.render(
        <Accordion data={{}}/>,
        document.getElementById('content')
    );

})();
