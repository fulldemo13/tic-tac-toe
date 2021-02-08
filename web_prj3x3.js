var mapa = [0, 0, 0,
			0, 0, 0,
			0, 0, 0,];

var jugador = 1;

var	ai = 0;

function	dos_jugadores()
{
	document.getElementById("juego").style="visibility:visible";
	document.getElementById("reinicio").style="visibility:visible";
	document.getElementById("start").style="visibility:hidden";
}

function un_jugador()
{
	dos_jugadores();
	ai = 1;
}

function numEspacios()
{
	var espacios = 0;

	for(i=0; i<9; i++)
		if(mapa[i] == 0) espacios++;
	return espacios;
}

function dibujar()
{
	for(i=0; i<9; i++)
	{
		if (mapa[i])
		{
			document.getElementById("block_"+i).onmouseout="";
			document.getElementById("block_"+i).onmouseover="";
			if(mapa[i] == 1)
			{
				document.getElementById("block_"+i).style="color: #e78268; cursor: default";
				document.getElementById("block_"+i).innerHTML="X";
			}
			else
			{
				document.getElementById("block_"+i).style="color: #8bb4e4; cursor: default";
				document.getElementById("block_"+i).innerHTML="O";
			}
		}
	}
}

function s_on(celda)
{
	if (jugador == 1)
	{
		celda.innerHTML="X";
		celda.style="color: #e78268"; 
	}
	else
	{
		celda.innerHTML="O";
		celda.style="color: #8bb4e4"; 
	}
}

function s_off(celda)
{
celda.innerHTML="";
}

function pcelda(celda)
{
	if (ai)
	{
		var ai_celda = Math.round(Math.random() * 9); 
		if (mapa[celda] == 0)
		{
			mapa[celda]=1;
		}
		if (numEspacios() > 1)
		{
			while (mapa[ai_celda] != 0)
				ai_celda = Math.round(Math.random() * 9);
			mapa[ai_celda]=2;
		}
	}
	else
	{
		if (mapa[celda]==0)
		{
			if (jugador==1)
			{
				mapa[celda]=1;
				jugador=2;
			}
			else
			{
				mapa[celda]=2;
				jugador=1; 
			}
		}
	}
	dibujar();
	var r = ganador();
	switch(r)
	{
		case 0:
		break;
		case 1:
			document.getElementById("p1").style="visibility: visible;";
		break;
		case 2:
			document.getElementById("p2").style="visibility: visible; color: rgb(128, 190, 226);";
		break;
		case 3:
			document.getElementById("empate").style="visibility: visible; color: white;";
		break; 
	}
}
function ganador()
{
	var espacios = numEspacios()
	// Las líneas horizontales
	if(mapa[0] == mapa[1] && mapa[1] == mapa[2] && mapa[0] != 0) return mapa[0];
	if(mapa[3] == mapa[4] && mapa[4] == mapa[5] && mapa[3] != 0) return mapa[3];
	if(mapa[6] == mapa[7] && mapa[7] == mapa[8] && mapa[6] != 0) return mapa[6];
	//Las líneas verticales
	if(mapa[0] == mapa[3] && mapa[3] == mapa[6] && mapa[0] != 0) return mapa[0];
	if(mapa[1] == mapa[4] && mapa[4] == mapa[7] && mapa[1] != 0) return mapa[1];
	if(mapa[2] == mapa[5] && mapa[5] == mapa[8] && mapa[2] != 0) return mapa[2];
	//Las diagonales
	if(mapa[0] == mapa[4] && mapa[4] == mapa[8] && mapa[0] != 0) return mapa[0];
	if(mapa[2] == mapa[4] && mapa[4] == mapa[6] && mapa[2] != 0) return mapa[2];

	if (espacios > 0)
		return 0;
	else 
		return 3;
}