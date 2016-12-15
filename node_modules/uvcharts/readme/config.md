Almost all styles/settings related to the chart being rendered is modify-able using the 3rd optional parameter **optionalConfiguration**.

The configuration itself is split into different groups based on which part of the graph they affect. Here is a overview of each of them:

## graph

|Property		|Value Type		|Default|		Description|
|--------------:|:-------------:|:-----:|-------------------|
|**palette**    |```string```	|*'Brink'*|Defines the color palette used while rendering the graph. Color palettes are predefined. Custom colors can be set using custompalette property|
|**background** |```#color```	| *#fff*|Defines the background color of the graph|
|**orientation**|```string```|*'Horizontal'*|Defines the orientation of the graph rendered.|
|**custompalette**|```array```| No Default | an array of color code/string which are used sequentially for the corresponding category/series|

#### palette (```string```)
Defines the color palette used while rendering the graph. Color palettes are predefined, ability to add custom color palettes is coming soon.
  
Currently available palettes: Plain, Simple, RGB, Olive, Soil and Sky, Candid, Sulphide, New Moon, Nature, Sea, Earth, Lemon, Water, Grass, Hash, Soft, Brink, Bright, Lint

#### background (```#color```)
Defines the background color of the graph

#### orientation (```string```)
Defines the orientation of the graph rendered.
      
Possible values: Horizontal, Vertical

## meta

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**position**	|```string```	|*'uv-div'*| CSS selector string of the dom element under which the graph needs to be rendered|
|**caption**	|```string```	|*''*	| Caption for the graph |
|**subCaption** |```string```	|*''*	| Subcaption for the graph. Its place right under the caption |
|**hlabel**		|```string```	|*''*	| Label for the horizontal axis to express what is being shown in that scale in your own terms|
|**vlabel**		|```string```	|*''*	| Label for the vertical axis to express what is being shown in that scale in your own terms|
|**hsublabel**	|```string```	|*''*	| Sublabel for the horizontal axis to express what is being shown in that scale in your own terms|
|**vsublabel**	|```string```	|*''*	| Sublabel for the vertical axis to express what is being shown in that scale in your own terms|

#### position (```string```)
CSS selector string of the dom element under which the graph needs to be rendered

#### caption (```string```)
Caption for the graph

#### subCaption (```string```)
Subcaption for the graph. Its placed right under the caption.

#### hlabel (```string```)
Label for the horizontal axis to express what is being shown in that scale in your own terms

#### vlabel (```string```)
Label for the vertical axis to express what is being shown in that scale in your own terms

#### hsublabel (```string```)
Sublabel for the horizontal axis to express anything else apart from the label in minor detail

#### vsublabel (```string```)
Sublabel for the vertical axis to express anything else apart from the label in minor detail

## dimension

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**width**		|```string```/```number```|400|Width of the graph in pixels (without 'px')|
|**height**		|```string```/```number```|400|Height of the graph in pixels (without 'px')|


#### width (```string```/```number```)
Width of the graph in pixels (without 'px')

#### height (```string```/```value```)
Height of the graph in pixels (without 'px')

## margin

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**top**		|```string```/```number```|50|Top margin of the graph in pixels (usually this space is occupied by Caption and Subcaption)|
|**bottom**		|```string```/```number```|150|Bottom Margin of the graph in pixels (usually this space is occupied by the horizontal axis label and caption)|
|**left**		|```string```/```number```|100|Left margin of the graph in pixels (usually this space is occupied by vertical axis label and caption)|
|**right**		|```string```/```number```|100|Right margin of the graph in pixels (usually this space is occupied by the legend)|


#### top (```string```/```value```)
Top margin of the graph in pixels (usually this space is occupied by Caption and Subcaption)

#### bottom (```string```/```value```)
Bottom Margin of the graph in pixels (usually this space is occupied by the horizontal axis label and caption)

#### left (```string```/```value```)
Left margin of the graph in pixels (usually this space is occupied by vertical axis label and caption)

#### right (```string```/```value```)
Right margin of the graph in pixels (usually this space is occupied by the legend)

## frame

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**bgcolor**	|```#color```	|'#FFF'	|Defines the background color of the frame, includes the graph and the margins|

#### bgcolor (```#color```)
Defines the background color of the frame, includes the graph and the margins

## axis

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**ticks**		|```number```	| 8		|Defines the number of ticks against the measuring axis|
|**subticks**	|```number```	| 2		| Defines the number of subticks against the measuring axis between ticks|
|**padding**	|```number```	| 5		| Defines the space between the axis and axis labels in pixels |
|**minor**		| ```number```	| -10	| Defines the minor tick length on the axis containing the label headers |
|**strokecolor**|```#color```	|'#000' | Defines the color used for axis strokes |
|**fontfamily**|```string```	|'Arial'| Defines the font family used for text in axis elements |
|**fontsize**|```number```| 14 | Defines the font size used for axis elements |
|**fontweight**| ```string``` | 'bold' | Defines the font weight used for text in axis elements |

#### ticks (```number```)
Defines the number of ticks against the measuring axis

#### subticks (```number```)
Defines the number of subticks against the measuring axis between ticks

#### padding (```number```)
Defines the space between between the axis and axis labels in pixels

#### minor (```number```)
Defines the minor tick length on the axis containing the label headers

#### strokecolor (```#color```)
Defines the color used for axis strokes

#### fontfamily (```string```)
Defines the font family used for text in axis elements

#### fontsize (```number```)
Defines the font size used for axis elements

#### fontweight (```string```)
Defines the font weight used for text in axis elements

## label

|Property		|Value Type		|Default|		Description|
|---------------|:-------------:|:-----:|-------------------|
|**fontfamily**	|```string```| 'Arial' | Font family used to show text in label elements |
|**fontsize**	|```number```|11| Font size used to show text in label elements|
|**fontweight**	|```string```| 'normal'| Font weight used to show text in label elements|
|**strokecolor**|```#color```|'#000'| Stroke color to show text in label elements|

#### fontfamily (```string```)
Font family used to show text in label elements

#### fontsize (```number```)
 Font size used to show text in label elements
 
#### fontweight (```string```)
Font weight used to show text in label elements

#### strokecolor (```#color```)
Stroke color to show text in label elements


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 