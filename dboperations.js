const config = "Server=(local);Database=EasyLinx;User Id=sa;Password=easylinxadm00!";
const sql = require('mssql')

async function getAll(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query(`SELECT  CADPROREFER as REFER,CADPRODESCR as DESCRI, CADPROCOLEC , SUM(P) P, SUM(M) M, SUM(G) G, SUM(GG) GG
		FROM
		(
			SELECT  CADPROREFER,CADPRODESCR, CADPROVDESCR, MOVITETP, MOVITEV_ESTOQUE, CADPROCOLEC
					FROM
					(
					SELECT  isNull(CADFOR.FORNE
					, '    ')  CADFORFORNE
					, isNull(CADPRO.DESCR
					, '                                        ')  CADPRODESCR
					, isNull(CADPRO.UNID
					, '      ')  CADPROUNID
					, isNull(CADPRO.REFER
					, '        ')  CADPROREFER
					,MOVITE.VR MOVITEVR
					, isNull(CADPROV.DESCR
					, '                    ')  CADPROVDESCR
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP)  MOVITETPORDEM
					,MOVITE.TP MOVITETP
					, isNull(CADPRO.COLEC
					, '   ')  CADPROCOLEC
					, isNull(CTAPAGG.DESCR
					, '                    ')  CTAPAGGDESCR
					, isNull(CADPRO.MARCA
					, '   ')  CADPROMARCA
					, isNull(CADPRO.FORNE
					, '    ')  CADPROFORNE
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-((MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)+MOVITE.QTDSIG_A)) ) MOVITEV_SALDO
					,SUM(((MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)-MOVITE.QTDSIG_A) ) MOVITEV_SALDOCSG
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-(MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)-(MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)) ) MOVITEV_ESTOQUE  from	movite
					left join cadpro on cadpro.refer=movite.refer 
					and cadpro.vr=movite.vr 
					and cadpro.tp=movite.tp  
					left join cadfor on	cadfor.forne = cadpro.forne  
					left join cadprov on	cadprov.vr = movite.vr 
					left join ctapagg on	ctapagg.ctapagg = cadpro.colec  
					left join cadproTOrdem on		cadproTOrdem.tpOrdem = movite.tp  
					where  movite.empre='002002' 
					and dtemi< '2021-01-23'  
					and (cadpro.espec = 'P' or cadpro.espec = ' ')  
					and cadpro.inati  = 0   
					group by isNull(CADFOR.FORNE
					, '    ') 
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					)d
			WHERE MOVITEV_ESTOQUE > 0
			)f
			pivot
			(
			max(MOVITEV_ESTOQUE)
			FOR MOVITETP IN (P, M, G, GG)
			)piv
		
WHERE (CADPROREFER not like '%LD%' and CADPROREFER not like '%PIL%')
GROUP BY PIV.CADPROREFER, PIV.CADPRODESCR, piv.CADPROCOLEC
ORDER BY CADPROCOLEC DESC;`);
        return products.recordset
    }catch (error){
        console.log(error)
    }
}

async function getRefer(refer){
    const regeX = /-/g; 
    refer = refer.replace(regeX, '\/')
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query(`SELECT  CADPROREFER as REFER,CADPRODESCR as DESCRI,CADPROVDESCR as DESCR, CADPROCOLEC , SUM(P) P, SUM(M) M, SUM(G) G, SUM(GG) GG
		FROM
		(
			SELECT  CADPROREFER,CADPRODESCR, CADPROVDESCR, MOVITETP, MOVITEV_ESTOQUE, CADPROCOLEC
					FROM
					(
					SELECT  isNull(CADFOR.FORNE
					, '    ')  CADFORFORNE
					, isNull(CADPRO.DESCR
					, '                                        ')  CADPRODESCR
					, isNull(CADPRO.UNID
					, '      ')  CADPROUNID
					, isNull(CADPRO.REFER
					, '        ')  CADPROREFER
					,MOVITE.VR MOVITEVR
					, isNull(CADPROV.DESCR
					, '                    ')  CADPROVDESCR
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP)  MOVITETPORDEM
					,MOVITE.TP MOVITETP
					, isNull(CADPRO.COLEC
					, '   ')  CADPROCOLEC
					, isNull(CTAPAGG.DESCR
					, '                    ')  CTAPAGGDESCR
					, isNull(CADPRO.MARCA
					, '   ')  CADPROMARCA
					, isNull(CADPRO.FORNE
					, '    ')  CADPROFORNE
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-((MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)+MOVITE.QTDSIG_A)) ) MOVITEV_SALDO
					,SUM(((MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)-MOVITE.QTDSIG_A) ) MOVITEV_SALDOCSG
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-(MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)-(MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)) ) MOVITEV_ESTOQUE  from	movite
					left join cadpro on cadpro.refer=movite.refer 
					and cadpro.vr=movite.vr 
					and cadpro.tp=movite.tp  
					left join cadfor on	cadfor.forne = cadpro.forne  
					left join cadprov on	cadprov.vr = movite.vr 
					left join ctapagg on	ctapagg.ctapagg = cadpro.colec  
					left join cadproTOrdem on		cadproTOrdem.tpOrdem = movite.tp  
					where  movite.empre='002002'
					and dtemi< '2021-01-23'  
					and (cadpro.espec = 'P' or cadpro.espec = ' ')
					and cadpro.inati  = 0   
					group by isNull(CADFOR.FORNE
					, '    ') 
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					)d
			WHERE MOVITEV_ESTOQUE > 0
			)f
			pivot
			(
			max(MOVITEV_ESTOQUE)
			FOR MOVITETP IN (P, M, G, GG)
			)piv
		
WHERE (CADPROREFER not like '%LD%' and CADPROREFER not like '%PIL%' AND CADPROREFER = \'${refer}\')
GROUP BY PIV.CADPROREFER, PIV.CADPRODESCR,piv.CADPROVDESCR, piv.CADPROCOLEC
ORDER BY CADPROCOLEC DESC`);
        return products.recordset
    }catch (error){
        console.log(error)
    }
}

async function getCollections(){
    try{
        let pool = await sql.connect(config);
        let collections = await pool.request().query(`SELECT CADPROCOLEC
		FROM
		(
			SELECT  CADPROREFER,CADPRODESCR, CADPROVDESCR, MOVITETP, MOVITEV_ESTOQUE, CADPROCOLEC
					FROM
					(
					SELECT  isNull(CADFOR.FORNE
					, '    ')  CADFORFORNE
					, isNull(CADPRO.DESCR
					, '                                        ')  CADPRODESCR
					, isNull(CADPRO.UNID
					, '      ')  CADPROUNID
					, isNull(CADPRO.REFER
					, '        ')  CADPROREFER
					,MOVITE.VR MOVITEVR
					, isNull(CADPROV.DESCR
					, '                    ')  CADPROVDESCR
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP)  MOVITETPORDEM
					,MOVITE.TP MOVITETP
					, isNull(CADPRO.COLEC
					, '   ')  CADPROCOLEC
					, isNull(CTAPAGG.DESCR
					, '                    ')  CTAPAGGDESCR
					, isNull(CADPRO.MARCA
					, '   ')  CADPROMARCA
					, isNull(CADPRO.FORNE
					, '    ')  CADPROFORNE
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-((MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)+MOVITE.QTDSIG_A)) ) MOVITEV_SALDO
					,SUM(((MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)-MOVITE.QTDSIG_A) ) MOVITEV_SALDOCSG
					,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-(MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)-(MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)) ) MOVITEV_ESTOQUE  from	movite
					left join cadpro on cadpro.refer=movite.refer 
					and cadpro.vr=movite.vr 
					and cadpro.tp=movite.tp  
					left join cadfor on	cadfor.forne = cadpro.forne  
					left join cadprov on	cadprov.vr = movite.vr 
					left join ctapagg on	ctapagg.ctapagg = cadpro.colec  
					left join cadproTOrdem on		cadproTOrdem.tpOrdem = movite.tp  
					where  movite.empre='002002' 
					and dtemi< '2021-01-23'  
					and (cadpro.espec = 'P' or cadpro.espec = ' ')  
					and cadpro.inati  = 0   
					group by isNull(CADFOR.FORNE
					, '    ') 
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					, isNull(CADPRO.DESCR
					, '                                        ') 
					, isNull(CADPRO.UNID
					, '      ') 
					, isNull(CADPRO.REFER
					, '        ') 
					,MOVITE.VR
					, isNull(CADPROV.DESCR
					, '                    ') 
					, isNull(STR(cadprotordem.ordem)
					, MOVITE.TP) 
					,MOVITE.TP
					, isNull(CADPRO.COLEC
					, '   ') 
					, isNull(CTAPAGG.DESCR
					, '                    ') 
					, isNull(CADPRO.MARCA
					, '   ') 
					, isNull(CADPRO.FORNE
					, '    ')  
					)d
			WHERE MOVITEV_ESTOQUE > 0
			)f
			pivot
			(
			max(MOVITEV_ESTOQUE)
			FOR MOVITETP IN (P, M, G, GG)
			)piv
		
WHERE (CADPROREFER not like '%LD%' and CADPROREFER not like '%PIL%')
GROUP BY piv.CADPROCOLEC
ORDER BY CADPROCOLEC DESC;`);
        return collections.recordset
    }catch (error){
        console.log(error)
    }
}

async function getOrders(refer){
    const regeX = /-/g; 
    refer = refer.replace(regeX, '\/')
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query(`SELECT REFER,DESCRI, DESCR, P, M, G, GG
		FROM
		(
			SELECT PEDPRO.REFER, cadpro.DESCR as DESCRI,  CADPROV.DESCR, PEDPRO.TP, PEDPRO.QTD_PED
			FROM PEDPRO
			left join CADPROV on cadprov.VR=pedpro.VR
			left join CADPRO on cadpro.REFER=pedpro.REFER
		)d
		PIVOT 
		(
		MAX(QTD_PED)
		FOR TP IN (P, M, G, GG)
		)piv
	WHERE REFER=\'${refer}\'`);
        return products.recordset
    }catch (error){
        console.log(error)
    }
}

async function getProductPrice(){
    try{
        let pool = await sql.connect(config);
        let products = await pool.request().query(`SELECT  CADPROREFER as REFER, MAX(P) AS P,  MAX(M) AS M, MAX(G) AS G, MAX(GG) AS GG 
		FROM
		(

		SELECT  isNull(CADPRO.DESCR
		, '                                        ')  CADPRODESCR
		, isNull(CADPRO.UNID
		, '      ')  CADPROUNID
		, isNull(CADPRO.REFER
		, '        ')  CADPROREFER
		, isNull(CADPRO.PTAB2
		, 000000000000000.000000)  CADPROPTAB2
		,MOVITE.VR MOVITEVR
		, isNull(CADPROV.DESCR
		, '                    ')  CADPROVDESCR
		, isNull(STR(cadprotordem.ordem)
		, MOVITE.TP)  MOVITETPORDEM
		,MOVITE.TP MOVITETP
		, isNull(CADPRO.COLEC
		, '   ')  CADPROCOLEC
		, isNull(CTAPAGG.DESCR
		, '                    ')  CTAPAGGDESCR
		,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-((MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)+MOVITE.QTDSIG_A)) ) MOVITEV_SALDO
		,SUM(((MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)-MOVITE.QTDSIG_A) ) MOVITEV_SALDOCSG
		,SUM(((MOVITE.QTDCOM_E-MOVITE.QTDCOM_D)+(MOVITE.QTDACE_E-MOVITE.QTDACE_D)-(MOVITE.QTDVEN_S-MOVITE.QTDVEN_D)-(MOVITE.QTDSIG_S-MOVITE.QTDSIG_D)) ) MOVITEV_ESTOQUE  from	movite 
		left join cadpro on cadpro.refer=movite.refer 
		and cadpro.vr=movite.vr 
		and cadpro.tp=movite.tp  
		left join cadprov on	cadprov.vr = movite.vr 
		left join ctapagg on	ctapagg.ctapagg = cadpro.colec  
		left join cadproTOrdem on		cadproTOrdem.tpOrdem = movite.tp  
		where  movite.empre='002002' 
		and dtemi< '2021-01-27'  
		and (cadpro.espec = 'P' or cadpro.espec = ' ')  
		and cadpro.inati  = 0   
		group by isNull(CADPRO.DESCR
		, '                                        ') 
		, isNull(CADPRO.UNID
		, '      ') 
		, isNull(CADPRO.REFER
		, '        ') 
		, isNull(CADPRO.PTAB2
		, 000000000000000.000000) 
		,MOVITE.VR
		, isNull(CADPROV.DESCR
		, '                    ') 
		, isNull(STR(cadprotordem.ordem)
		, MOVITE.TP) 
		,MOVITE.TP
		, isNull(CADPRO.COLEC
		, '   ') 
		, isNull(CTAPAGG.DESCR
		, '                    ')  
		, isNull(CADPRO.UNID
		, '      ') 
		, isNull(CADPRO.REFER
		, '        ') 
		, isNull(CADPRO.PTAB2
		, 000000000000000.000000) 
		,MOVITE.VR
		, isNull(CADPROV.DESCR
		, '                    ') 
		, isNull(STR(cadprotordem.ordem)
		, MOVITE.TP) 
		,MOVITE.TP
		, isNull(CADPRO.COLEC
		, '   ') 
		, isNull(CTAPAGG.DESCR
		, '                    ')
		)d  
		pivot
		(
		max(cadproptab2)
		FOR MOVITETP IN (P, M, G, GG)
		)piv
WHERE MOVITEV_ESTOQUE > 0 
GROUP BY CADPROREFER`);
        return products.recordset
    }catch (error){
        console.log(error)
    }
}


module.exports = {
    getAll: getAll,
    getRefer: getRefer,
	getCollections: getCollections,
	getOrders: getOrders,
	getProductPrice: getProductPrice
}