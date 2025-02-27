import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import SubHeading from './SubHeading'
import PixelCard from './reactBits/components/PixelCard/PixelCard'
import Link from 'next/link'

interface ProjectType {
	slug: string
	title: string
	description: string
	headerImage: string
	content: string
}

function ProjectsSection() {
	const projects: ProjectType[] = [
		{
			slug: 'project-1',
			title:
				'Etiam finibus, ligula non porttitor commodo, felis sem consequat diam, dignissim interdum massa erat id elit. Praesent condimentum, arcu id mollis ultricies, massa ligula scelerisque libero, at imperdiet nulla lorem vel sem. Pellentesque odio est, tincidunt quis ex quis, sollicitudin fermentum felis. Nullam et nunc tempus, dapibus risus non, aliquet tellus. Aenean vitae purus ut nulla sagittis hendrerit. Aliquam id pulvinar erat, sed scelerisque velit. Duis sollicitudin elementum interdum. Mauris tempor porttitor neque, et rhoncus augue ultricies a. Vestibulum quis nunc at purus rhoncus eleifend vitae euismod enim. Vestibulum quis facilisis diam. Aenean malesuada finibus erat, sed venenatis quam sagittis ac. Vivamus vestibulum, elit et vestibulum laoreet, nisi neque accumsan sem, eu ultricies magna lorem sit amet ex.',
			description: 'Project 1 description',
			headerImage: 'https://picsum.photos/800/400',
			content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur volutpat eget tellus luctus tempor. Maecenas feugiat quam erat, eget porta sapien imperdiet vel. Duis bibendum justo ligula, et vulputate purus vehicula eleifend. Etiam ipsum ipsum, auctor in tortor ut, rhoncus imperdiet ligula. Sed ornare rhoncus arcu, sed porta purus vulputate eu. Suspendisse porttitor odio nunc, et fermentum tortor interdum at. Etiam a volutpat elit. Suspendisse semper pretium metus, quis interdum nunc consectetur nec. Nulla mattis diam sed massa iaculis blandit. Nam ac ullamcorper velit. Nulla non iaculis leo, nec venenatis nulla. Donec sit amet nulla augue. Quisque facilisis erat eu magna scelerisque, sed viverra velit sagittis. Cras vestibulum finibus leo ac bibendum. Aenean maximus quam a lacus vestibulum, fringilla pretium tortor consequat.

Etiam finibus, ligula non porttitor commodo, felis sem consequat diam, dignissim interdum massa erat id elit. Praesent condimentum, arcu id mollis ultricies, massa ligula scelerisque libero, at imperdiet nulla lorem vel sem. Pellentesque odio est, tincidunt quis ex quis, sollicitudin fermentum felis. Nullam et nunc tempus, dapibus risus non, aliquet tellus. Aenean vitae purus ut nulla sagittis hendrerit. Aliquam id pulvinar erat, sed scelerisque velit. Duis sollicitudin elementum interdum. Mauris tempor porttitor neque, et rhoncus augue ultricies a. Vestibulum quis nunc at purus rhoncus eleifend vitae euismod enim. Vestibulum quis facilisis diam. Aenean malesuada finibus erat, sed venenatis quam sagittis ac. Vivamus vestibulum, elit et vestibulum laoreet, nisi neque accumsan sem, eu ultricies magna lorem sit amet ex.

Donec ornare justo ac metus mattis, eu vehicula erat ultricies. Proin id elit at sem efficitur aliquet dignissim ut nunc. Phasellus tincidunt ipsum lorem, vel imperdiet velit ultricies quis. Aliquam non varius mi. Proin luctus sapien a dictum dapibus. Sed ornare tempus metus, a imperdiet lacus malesuada sed. Fusce tincidunt felis sem, vel posuere felis blandit ut.

Praesent in velit neque. Donec ut ullamcorper dui. Praesent euismod a nisl et porta. Duis in felis metus. Suspendisse pulvinar tortor finibus felis aliquam pulvinar. Phasellus quam mauris, interdum vitae sem at, dictum ultrices risus. Aenean id massa arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean bibendum commodo dolor non luctus. Nam at dolor mi. Donec cursus molestie justo, nec porta augue rutrum vel. Ut semper aliquet turpis vel malesuada. Maecenas interdum enim vitae metus pharetra pulvinar.

Donec eu ullamcorper risus. Aliquam eleifend ornare finibus. Pellentesque at mauris risus. Vivamus quis mi ultricies, vestibulum dui lobortis, semper tellus. Donec pellentesque, mi in cursus consequat, ligula erat pellentesque dui, et ullamcorper orci orci eu nisl. In hac habitasse platea dictumst. Sed consectetur fringilla mi at egestas. Mauris ultrices risus ut arcu tempor, sit amet suscipit tortor pellentesque.

Mauris ornare tortor nulla, vel laoreet ligula sodales ac. Pellentesque a cursus elit. Phasellus tempus eros quis gravida faucibus. Nulla et ligula vitae arcu fringilla porta. Praesent erat libero, maximus nec dictum non, suscipit ornare ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam mollis est eu tortor consequat, vitae molestie sapien porttitor. Quisque ut massa nec orci consequat vehicula ac non nulla. Nam eget ante eget libero porttitor sodales. In placerat quam eu leo rhoncus ultrices. Suspendisse et nisi augue. Nulla consectetur malesuada justo, vitae imperdiet ante lacinia vitae. Sed tempus metus erat. Curabitur id libero vel nunc convallis tincidunt nec a urna. Morbi lectus magna, imperdiet nec tortor id, efficitur luctus est.

Aenean nulla justo, elementum non bibendum eu, dictum ac velit. Vestibulum a lectus vulputate, laoreet nulla nec, porta odio. Cras feugiat eu arcu vel fermentum. Morbi at dolor ultrices purus euismod mollis. Ut elit dui, posuere quis lorem ut, vestibulum blandit massa. Aenean in erat a massa imperdiet rhoncus at vitae urna. Integer eget mollis purus. Duis nec sagittis massa. Fusce facilisis massa at tincidunt eleifend. In vitae suscipit sem, non tincidunt felis. Phasellus non ex eget ante scelerisque pharetra vehicula id est.

Duis consequat porta mauris, eu facilisis neque molestie non. Phasellus non justo sed justo porta convallis. Nullam luctus ornare rutrum. Duis scelerisque placerat sodales. Aenean posuere nibh et ipsum molestie aliquet. Cras at faucibus felis. Pellentesque nisi nunc, pharetra et ullamcorper et, sollicitudin et odio. Nunc ante nulla, rhoncus vitae lorem at, bibendum dapibus sem. Vestibulum eget euismod felis. In lobortis finibus ex sed luctus. Suspendisse eu turpis erat. Nulla ac tellus sit amet metus consectetur pretium eu non nisi. Suspendisse potenti. Donec tristique mauris in convallis aliquet. Cras convallis augue et risus faucibus suscipit. Maecenas convallis magna nec eleifend ullamcorper.

Suspendisse eget massa augue. Quisque malesuada, lectus et volutpat vulputate, dui odio scelerisque ex, id pulvinar risus est vitae nibh. Curabitur tempor erat et ante luctus laoreet. Quisque consectetur at purus non vehicula. Donec eget placerat nunc. Suspendisse viverra, justo at suscipit ullamcorper, felis nisi porttitor mauris, vel luctus lorem erat non urna. Nullam sodales ipsum vitae lorem suscipit, a faucibus lacus tempor. Morbi risus lectus, posuere sit amet dignissim in, lacinia aliquet lectus. Ut mollis orci ante. Aenean eu ante id nisl finibus gravida. Suspendisse maximus lacinia nunc eu fringilla. Aliquam sit amet lectus sit amet elit aliquam tristique in id metus. Nunc commodo, enim ac egestas maximus, elit ligula ullamcorper orci, ultricies iaculis felis mi a nulla.

Mauris non justo eu dolor vehicula ornare. Donec feugiat lacinia magna, a accumsan enim tempus sit amet. Duis ullamcorper neque leo, non scelerisque neque tristique eget. Pellentesque sit amet egestas mi. Fusce sed dolor nec leo tempor euismod eget id lacus. Nam luctus, magna vitae congue feugiat, turpis augue varius leo, ac dictum tortor est id ante. Curabitur rhoncus volutpat vulputate.

Maecenas consequat sollicitudin dui ut congue. Proin ultrices, mauris id tempor blandit, massa ipsum varius mauris, ut varius ligula justo et erat. Mauris finibus metus eu euismod ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis gravida tempor rhoncus. Quisque vitae arcu ex. Fusce fringilla nisl neque, ac vestibulum sem vehicula eu. Fusce blandit dui sit amet dapibus facilisis. Donec lobortis molestie mattis. Aenean vestibulum quam eget ultricies efficitur. Praesent scelerisque fermentum nunc ac euismod. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi varius magna in lacus euismod, at varius tellus elementum. Duis ut neque id dolor auctor imperdiet eget vel erat. Aliquam at luctus justo. Cras elementum porttitor nisi, sed sagittis risus semper et.

Nullam vitae diam egestas, consequat dui eget, varius est. Sed ac egestas tellus. Maecenas at est nec nisl tincidunt scelerisque. Nam ornare enim eget ipsum pellentesque, quis posuere nisi pellentesque. In sodales justo at neque laoreet tincidunt. Vivamus id blandit ante. Curabitur nec malesuada risus. Integer sed felis feugiat, fermentum nibh ornare, ultrices massa. Praesent lacinia iaculis dapibus. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Morbi vitae porta libero, vel sodales magna. Pellentesque accumsan ultricies massa, ut malesuada est. Nam bibendum elit at magna congue consequat. In laoreet fringilla nibh, sit amet tempus tellus sollicitudin ac. Donec urna ipsum, vehicula vitae hendrerit sed, sodales et quam. Donec dui ligula, vehicula blandit finibus vel, efficitur quis justo. Nam quis malesuada elit. Nulla facilisi. Maecenas purus tortor, vehicula eget finibus nec, mattis eu dolor. Sed eget justo non turpis laoreet suscipit. Proin accumsan massa fermentum, condimentum dui a, maximus augue. Curabitur lobortis suscipit pulvinar. Mauris sit amet massa eros. Duis sit amet ipsum at augue sodales cursus ac ac velit.

Fusce ac justo risus. Vivamus accumsan ipsum quis ipsum viverra dictum. Sed vel rutrum dolor. Nunc risus elit, consectetur vitae lacus in, bibendum sollicitudin magna. Etiam tincidunt sapien ac arcu facilisis posuere. Nulla condimentum purus vitae turpis sodales, sed ornare mi rutrum. Integer pulvinar gravida tellus. Nulla vel lectus non tellus feugiat elementum sed et nulla. Morbi ac leo neque.

Integer urna risus, maximus eget vehicula eget, pretium ac odio. Suspendisse tincidunt consequat dolor vitae lobortis. Nullam porttitor urna a lectus sollicitudin, et accumsan metus consectetur. Nulla tempor et ex eget tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vivamus vestibulum lacus et ex fermentum lobortis. Ut a ligula et nibh consectetur fermentum. Proin eleifend urna lectus, id dictum odio finibus nec. Vestibulum consectetur erat enim, non convallis leo vehicula sit amet. Nunc ut diam facilisis, faucibus leo at, interdum est. Nunc turpis magna, semper et tempus ut, elementum quis turpis. Nunc ac augue sagittis, ultricies augue sit amet, porttitor nisi. Suspendisse vel tellus lectus. Donec leo nibh, posuere vel massa eget, posuere euismod sapien.

Duis odio elit, ultrices vel felis vitae, molestie tincidunt augue. Donec hendrerit diam a diam viverra sagittis. Aliquam pretium nisi vitae ipsum ultricies luctus a non augue. Maecenas tincidunt scelerisque nisi, in efficitur massa. Pellentesque placerat metus dolor. Vestibulum ultricies eros risus, blandit hendrerit nibh tincidunt vel. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Integer convallis nisi dapibus turpis commodo venenatis in quis leo. Quisque iaculis neque a diam eleifend scelerisque. Morbi venenatis ac risus et porta.

Duis id nulla venenatis, iaculis tortor non, fermentum augue. Mauris lobortis suscipit ultrices. Mauris ullamcorper diam sed elit varius, at cursus tellus finibus. Maecenas in laoreet sem. Vivamus porttitor, metus in tincidunt faucibus, nisl odio laoreet metus, scelerisque volutpat dolor lorem non risus. Sed venenatis dictum volutpat. Nunc vulputate, ligula ornare molestie egestas, leo nisi rhoncus ligula, sit amet cursus augue enim et risus. In egestas ut lacus sit amet vestibulum. Sed mollis ligula malesuada dapibus aliquam. Phasellus sollicitudin in arcu in viverra. Vestibulum sit amet faucibus lectus. Duis condimentum tellus non laoreet luctus. Nullam pulvinar ultricies erat, tincidunt efficitur nisi volutpat non. Cras non elit congue, dapibus purus et, mollis purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Quisque in nibh placerat, accumsan neque eu, varius ex.

Integer at sapien ipsum. Aliquam in justo bibendum, porttitor lectus eu, dictum dolor. Cras aliquet urna eu metus pretium facilisis. Morbi laoreet enim bibendum hendrerit posuere. Curabitur faucibus magna odio, et sodales quam imperdiet gravida. Etiam eu dapibus felis. Vivamus pharetra eros et nulla ultricies ultricies. Donec rhoncus sed urna eu volutpat. Integer sollicitudin purus nec erat semper, eget venenatis tellus aliquet. Duis tristique dapibus metus, nec interdum nisi condimentum ut. Donec imperdiet ullamcorper hendrerit. Integer sed mattis ante.

Suspendisse sed commodo elit, quis vehicula diam. Donec at dui tortor. Curabitur scelerisque sed ligula quis rhoncus. Sed purus ex, mattis sit amet sem sit amet, ornare sodales nisi. Praesent et varius leo. Duis in urna eget diam semper commodo. Praesent quis auctor quam. Nam est felis, faucibus sit amet justo et, pretium dictum sapien. Curabitur mollis ligula sit amet sem varius, id lobortis mi luctus. Donec ac dui mollis, sollicitudin turpis eu, porttitor ex. Nam mattis mi sed nulla bibendum condimentum. Proin cursus arcu id tempus fermentum. Donec ut ex sem. Sed ac metus eget massa congue vestibulum.

In hac habitasse platea dictumst. Aenean tincidunt mauris sit amet dictum varius. Praesent vel orci leo. Donec mollis tincidunt sem id pulvinar. Sed ac egestas dui, quis pulvinar lectus. Integer at neque commodo nunc laoreet elementum id sed erat. Sed ullamcorper est ac ligula venenatis, at pulvinar ante suscipit. Fusce in elementum lorem, nec ultrices purus. Aenean dignissim imperdiet vulputate. Ut volutpat, elit in sodales malesuada, lacus nisl mollis diam, tincidunt elementum ipsum quam eget tortor. Vivamus vestibulum massa velit, a mollis magna suscipit et. Duis eu erat sodales risus consectetur tempus condimentum at tellus.

In orci magna, molestie eget elit eu, auctor eleifend justo. Ut luctus diam sit amet vehicula vulputate. Vivamus eu interdum justo. Duis placerat orci massa, quis sollicitudin libero cursus nec. Donec consectetur vestibulum pharetra. Fusce laoreet, ipsum in pretium consequat, elit justo sodales nisl, accumsan sagittis justo ligula at tortor. Morbi turpis mauris, vehicula a tellus eget, ultrices porttitor dui. Integer risus odio, vestibulum a ornare non, porttitor eget magna. Curabitur quis urna et elit volutpat bibendum. Suspendisse vel tincidunt mi. Suspendisse dictum urna tortor, sed rhoncus elit suscipit a. Duis feugiat enim tortor, eu dapibus turpis imperdiet ut. Quisque sit amet sem pharetra, pulvinar mauris in, sodales risus. Nulla at luctus arcu. Maecenas consectetur neque vitae laoreet dictum.

Curabitur egestas, nunc non vulputate euismod, augue orci consequat felis, hendrerit tincidunt felis ipsum sed purus. Morbi gravida vulputate placerat. Proin nec lorem vehicula, convallis nisi a, pharetra erat. Sed finibus euismod urna id mattis. Vivamus placerat egestas libero a aliquet. Maecenas ac nisi quis urna dictum sodales. Donec nisi felis, pellentesque a felis sed, accumsan bibendum metus. Nullam eleifend fringilla tellus, a mollis nunc porttitor vel. Aenean pellentesque commodo urna non rutrum. Morbi sollicitudin sit amet lacus dignissim hendrerit. Nunc volutpat dui lacus, ut egestas tortor venenatis vitae. Quisque ultrices porttitor erat a fringilla.

In hac habitasse platea dictumst. Vivamus nec urna tortor. Duis semper a ligula et interdum. Suspendisse eget venenatis leo. Suspendisse potenti. Fusce mollis varius ligula, et commodo quam tempus eu. Nunc varius tristique gravida. Maecenas a congue arcu, sed malesuada ligula. Donec ornare vel ipsum quis maximus. Phasellus tincidunt placerat vehicula. Aliquam ut nunc nulla. Integer aliquam, lorem commodo venenatis fermentum, nibh erat auctor velit, a efficitur quam libero pharetra mi. Sed laoreet id massa nec tincidunt. Donec eget hendrerit diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Quisque scelerisque, orci quis ultrices faucibus, velit nulla sagittis mi, a convallis felis nunc vel lacus. Aliquam semper turpis quis justo vestibulum, eu finibus sem volutpat. Mauris nisi orci, tempor nec quam ac, consequat dapibus sapien. Aliquam a magna quis neque posuere sollicitudin efficitur eget urna. Integer varius nulla vitae lacus tristique, nec venenatis tortor commodo. Sed placerat malesuada enim, at fermentum dui pellentesque et. Aenean non justo risus. Suspendisse lobortis eros metus, sit amet molestie massa rhoncus at. Fusce cursus porta est nec congue. Etiam sed consequat ex. Phasellus risus est, congue eu lectus at, aliquam rutrum turpis. Sed lacus ipsum, commodo in felis ut, laoreet ornare arcu. Nullam aliquet dui quis nulla rutrum hendrerit. Aliquam at odio nec ante vulputate ultricies.

Ut efficitur ligula non tincidunt rhoncus. Duis faucibus eros eu lacus euismod tincidunt. Morbi lorem nisi, luctus eget ipsum eget, ornare aliquet neque. In dolor ante, consequat a ex ac, viverra pulvinar elit. Nunc mollis enim vitae varius tristique. Aliquam sagittis tristique diam, a lobortis mauris ultrices eu. Aliquam id elit nisi. Nunc ipsum augue, pellentesque vel imperdiet at, tincidunt id mauris. Fusce blandit fermentum enim, id porta magna placerat egestas.

Morbi posuere nisl ac egestas aliquet. Aenean metus sem, tincidunt sed finibus a, imperdiet quis enim. Fusce pharetra hendrerit est vitae efficitur. Proin sit amet dictum sapien. Ut tempus, ex congue accumsan vestibulum, ante est finibus risus, et lobortis nunc turpis vel augue. Sed semper imperdiet elit, ac vestibulum elit sagittis eget. Proin at nunc quis arcu tempor molestie nec in tortor. Aliquam ante felis, ullamcorper quis elit vel, tristique hendrerit risus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in pretium odio, a finibus felis. Aliquam tincidunt auctor arcu, ut porta arcu volutpat eu.

Cras in pellentesque odio, vitae luctus elit. Vestibulum condimentum ante eu nunc tincidunt, vel hendrerit risus convallis. Donec interdum ut diam ac dapibus. Nunc vulputate non ex sed semper. Curabitur vehicula, massa et ultrices pulvinar, augue sapien tincidunt nisl, sit amet scelerisque leo urna in felis. Nulla finibus urna quis tempus congue. Fusce accumsan scelerisque nisl, at cursus erat pretium non. Nunc eget lacus a libero aliquet venenatis nec sit amet justo. Praesent blandit convallis tempus. Vestibulum hendrerit tortor at eros commodo volutpat.

Nulla eu nunc sed nisl condimentum rhoncus. Ut a orci congue, mattis ligula imperdiet, blandit magna. Morbi pulvinar congue lorem, vel dignissim mi venenatis eget. Nunc eget diam ligula. Sed at porttitor nunc. Donec pulvinar ante massa, vitae ultricies mi semper in. Nam malesuada nisl ac odio volutpat rutrum. Pellentesque ac maximus odio. Praesent nec hendrerit quam. Pellentesque tellus risus, pharetra sed ante in, auctor iaculis magna. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Nulla a tortor augue. Aliquam in elit eleifend, lobortis tellus sit amet, volutpat dui. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam eu lorem id nisl consectetur dignissim. Fusce at iaculis ligula, at luctus ipsum. Duis id maximus tellus. Proin aliquet porttitor diam, vel egestas erat dictum et. Morbi tempor et eros a eleifend. Cras tempus ornare efficitur. Sed placerat lacinia ligula, at facilisis augue egestas eget. Quisque eu nunc commodo neque iaculis ullamcorper. Nulla vel semper nibh, at sagittis lacus. Mauris et arcu non lacus cursus vulputate.

Cras suscipit velit lectus. Sed dignissim, mi ac cursus tincidunt, diam ex pulvinar lacus, at consequat orci justo sed lacus. Nullam at accumsan tortor, non laoreet felis. Mauris sit amet aliquam ante, quis pellentesque diam. Cras dictum eros tortor. Phasellus sit amet odio gravida, venenatis diam nec, cursus nunc. Proin ut varius ex. Mauris molestie varius dolor mollis elementum.

Fusce nibh elit, volutpat vel venenatis at, maximus eget turpis. Pellentesque at turpis eu ex suscipit efficitur vel at nisi. Quisque tincidunt, sapien non accumsan tempor, nibh nisi volutpat libero, in porttitor dolor magna quis velit. Etiam tempus non turpis id feugiat. Sed tristique erat nunc. Curabitur vel ullamcorper neque. Mauris et massa non diam varius blandit id sit amet dui. Praesent diam nisl, tristique id nulla eu, feugiat pellentesque libero. Ut pretium aliquet magna vel vestibulum. Vestibulum dignissim vehicula dictum. Ut imperdiet in nulla id sollicitudin. Etiam semper viverra nisl eu molestie. Quisque fringilla placerat aliquam. Pellentesque eget dolor nibh. Mauris et mattis neque, nec finibus leo.

Etiam sed molestie est. Pellentesque maximus tempor massa, sed ornare ligula ornare at. Aenean viverra consectetur efficitur. Sed et elementum quam. Morbi rutrum sapien quis maximus facilisis. Aenean ut velit quis odio viverra euismod. Praesent non neque et tortor tincidunt euismod.

Sed consectetur, sapien vel elementum aliquet, sem arcu molestie magna, vel mollis arcu sapien ac ex. Sed vel venenatis ante. Sed fermentum dictum orci sed malesuada. Aliquam ut est turpis. Aliquam cursus rhoncus dolor eu vestibulum. Aenean sollicitudin metus at purus laoreet, eu lacinia velit semper. Curabitur nec sem eu mi tempor fringilla eu nec ante. Donec id ipsum non dui faucibus laoreet ut at nibh. Sed pulvinar nibh aliquet, dapibus est a, dapibus velit. Quisque vitae justo ac mauris euismod scelerisque. Aenean bibendum volutpat tellus, at consectetur tellus feugiat sit amet. Donec pretium suscipit fringilla. Morbi non risus urna. Nullam eget efficitur lorem. Mauris vestibulum est sit amet malesuada consectetur.

In eleifend ante at tortor semper, mattis tincidunt arcu facilisis. Praesent diam risus, facilisis id sagittis quis, aliquet et elit. Phasellus et ipsum lectus. Sed egestas commodo est, quis semper nulla ullamcorper vitae. Quisque ut suscipit erat. Vestibulum a nisi nec metus malesuada tincidunt mollis sit amet turpis. Ut faucibus nisi massa, non placerat urna fermentum non. Quisque porttitor dapibus leo id fermentum. Nam hendrerit ornare sollicitudin. Ut lobortis sapien vel dui ullamcorper, a sollicitudin ligula venenatis. Aenean vulputate luctus nibh, at hendrerit ligula consequat sit amet. Fusce porttitor dui sed faucibus accumsan. In eget fermentum diam, vel euismod massa. Quisque quis eros commodo, ultricies lacus sit amet, pretium ipsum. Aenean condimentum eget metus non hendrerit.

Nulla maximus, justo vitae hendrerit laoreet, ex erat viverra mi, id sollicitudin mi ligula eget lacus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Ut vulputate ex tincidunt, sagittis ante eu, porttitor elit. In hac habitasse platea dictumst. Aliquam rutrum nibh metus, eu volutpat magna luctus sed. Mauris et arcu euismod, dictum magna quis, mollis ligula. Nam nisl diam, sagittis et tellus ut, sodales congue justo. Aenean congue ex id augue varius pharetra. Maecenas a quam sollicitudin, placerat magna eu, fermentum purus.

Donec placerat, purus ac tempor rutrum, est diam interdum tortor, eget ornare lectus enim posuere leo. Vestibulum at mollis neque, eu porttitor metus. Aliquam odio lacus, mollis et eros nec, porttitor aliquam turpis. Aliquam faucibus rhoncus lacinia. Fusce mattis ipsum pretium scelerisque tempus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus consequat lorem quis pellentesque feugiat. Aliquam et bibendum odio.

In fringilla at elit sit amet consequat. Donec bibendum elit eget lacinia vulputate. Aenean aliquet nisl vitae auctor viverra. In ac magna varius risus egestas bibendum vitae eu velit. Proin in consectetur nisl, ut fringilla massa. Nunc elementum molestie dictum. Pellentesque mi orci, aliquam sit amet libero at, sodales sodales enim. Aenean leo enim, faucibus non sapien et, tempor sollicitudin purus. Vivamus tincidunt metus vitae neque cursus, eget bibendum justo tempor. Vivamus sed mi erat. Fusce sagittis pharetra finibus. Fusce ultrices dolor tellus. Sed iaculis neque eu justo pellentesque eleifend. Ut mattis, nulla id malesuada volutpat, elit dui rutrum sapien, et bibendum odio dolor ac neque. Nunc ac arcu efficitur, varius orci dapibus, fringilla libero.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus purus lacus, lacinia et commodo sed, rhoncus nec mi. Curabitur ac lobortis ligula, nec vehicula nisi. Pellentesque condimentum felis in magna placerat vulputate. Integer tortor velit, sagittis vel rhoncus aliquet, ultrices vel turpis. Duis pretium commodo enim eget elementum. Sed in mattis ipsum. Suspendisse ultricies in felis vel congue. Mauris eleifend placerat erat, sed volutpat ex condimentum sed. Etiam vel risus tempus ipsum faucibus feugiat. Aliquam vulputate maximus mattis. Phasellus quis fermentum urna. Suspendisse facilisis convallis volutpat. Duis tortor leo, placerat vitae porttitor eget, pharetra at mi. Cras congue nunc sit amet arcu interdum rhoncus.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas eu ipsum quis leo varius posuere. Nunc lorem tortor, rhoncus eget gravida id, ornare sit amet metus. Aenean at libero at elit sodales porta. Pellentesque vehicula ante eu eros sodales, sed lobortis neque lobortis. Maecenas ac vulputate leo. Proin finibus ante enim, vitae dignissim neque porttitor nec. Ut commodo vestibulum nisl, at placerat elit aliquam id. Proin quis sagittis ligula, sit amet semper odio. Nam eleifend tortor ut pretium sollicitudin. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque et augue orci. Suspendisse vitae rhoncus ante. In tellus odio, luctus vitae lorem consectetur, vulputate congue tortor. Phasellus euismod odio sed leo sodales, vel rutrum tortor molestie. Integer imperdiet ultricies mi, luctus pharetra mauris molestie tempor.

Praesent sit amet tempor libero. Aenean tempus volutpat semper. Integer ac dolor ac ipsum malesuada finibus. Fusce venenatis velit non felis luctus, at tincidunt est pharetra. Aenean sit amet sollicitudin sapien, in vulputate diam. Pellentesque tincidunt consequat odio, vel ultrices eros egestas ac. Praesent vitae metus non erat auctor hendrerit. Morbi gravida volutpat lorem, in pulvinar orci malesuada at. Suspendisse sagittis, neque eu laoreet rutrum, arcu lorem feugiat massa, in sagittis velit leo sed tellus. Mauris placerat pretium nisl, eu tincidunt arcu. Suspendisse dui dolor, lacinia ut malesuada consectetur, efficitur sed turpis. Phasellus lobortis velit mauris, efficitur molestie eros porta ultricies. Nam luctus nunc vel purus gravida, nec vulputate odio varius. Nulla efficitur sem in elit imperdiet porta.

Cras orci neque, malesuada vitae pretium in, efficitur eget metus. Proin hendrerit cursus erat vitae ultricies. Integer a rutrum lorem, ac blandit nulla. Phasellus eu dapibus enim, ac lacinia arcu. In hac habitasse platea dictumst. Morbi feugiat diam laoreet lacus interdum ullamcorper. Vestibulum venenatis a enim ac pharetra. In ligula sapien, sollicitudin ut turpis vitae, tincidunt malesuada dolor. Aenean rhoncus velit id erat iaculis molestie.

Vestibulum eget nibh eu mauris condimentum porta. Vestibulum lectus urna, pulvinar ac lorem vel, vehicula fermentum nibh. Morbi finibus rhoncus suscipit. Vivamus leo purus, aliquet et quam eu, fermentum auctor ex. Morbi et velit lorem. Vestibulum malesuada, sapien a vestibulum finibus, odio augue vestibulum nisi, sed malesuada arcu erat id erat. Morbi nec lacus at arcu vehicula posuere et in nunc. Proin in libero eget arcu dapibus porttitor.

Phasellus eget luctus felis, id sollicitudin diam. Phasellus non eleifend sapien. Curabitur accumsan tempor libero, sit amet iaculis elit aliquam at. Cras tincidunt, nulla non lacinia tristique, arcu justo hendrerit massa, et gravida libero ipsum et magna. Sed velit urna, tincidunt sed tincidunt eu, mollis vitae ligula. Nulla fringilla porttitor enim, at euismod arcu ornare sed. Vestibulum magna erat, finibus sed enim ut, condimentum imperdiet nisl. Vivamus ipsum arcu, ornare at metus sodales, pellentesque tempus tortor. Ut hendrerit nunc non lectus tempor suscipit. Nam elementum sodales urna non feugiat. Maecenas fringilla urna ac enim bibendum, a gravida augue commodo.

Integer et cursus nisi, id sagittis leo. Nullam ut est ut dolor rhoncus pretium sit amet vitae ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum vel pulvinar neque, et bibendum justo. Quisque neque sapien, congue consectetur ante id, molestie maximus diam. Donec purus nibh, ultrices eu tincidunt in, sagittis non leo. Vivamus ut sapien vitae leo scelerisque accumsan. Duis scelerisque sapien in tellus lacinia, vitae aliquam neque pretium. Suspendisse sit amet dolor bibendum, auctor mauris et, vestibulum nisl.

In ipsum dui, laoreet vitae molestie sed, dignissim at urna. Integer hendrerit, sapien sed facilisis tempor, odio nibh pretium eros, in sollicitudin ex augue sed tortor. In suscipit a dolor vel sodales. Mauris dapibus dignissim orci, quis ullamcorper massa ullamcorper non. Nunc ac lorem libero. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam facilisis egestas nisi. Aliquam massa ex, finibus et laoreet sit amet, sodales finibus dolor. Quisque vel ipsum sit amet dui semper porttitor. Vestibulum fringilla rhoncus est, nec pharetra enim rutrum ut. Suspendisse rhoncus consectetur fringilla. Duis pulvinar malesuada mauris, id fringilla risus. Suspendisse eget ornare velit.

Mauris posuere magna vitae dui fringilla, eget dictum nisi malesuada. Nam nulla diam, egestas sollicitudin ultrices sed, euismod sit amet nunc. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque nunc nunc, interdum ac venenatis eget, sollicitudin ut nulla. Integer ullamcorper ut dui sit amet condimentum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed quis sagittis odio, sit amet feugiat nisi. Proin orci dolor, tristique quis dignissim sodales, feugiat id nisi. Proin iaculis quam eget sapien congue, vitae scelerisque nulla ornare.

Nam magna ipsum, molestie eu turpis quis, rutrum rhoncus justo. Praesent laoreet libero vitae eros posuere placerat. In euismod vitae nibh at imperdiet. Donec vulputate, tellus vitae sodales vehicula, magna lacus aliquet quam, non venenatis velit justo ac mi. Duis quis ligula in elit sodales convallis nec ac turpis. Integer convallis suscipit pharetra. Aliquam in rutrum mauris. Ut vehicula ut lorem vitae condimentum. In pharetra tellus purus, eu commodo nibh volutpat eget. Ut quis sapien consectetur, tincidunt elit non, facilisis tortor. Nam eu ipsum ut ipsum interdum pharetra vel at lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

In vulputate sollicitudin massa, nec faucibus mi finibus at. Nunc vehicula odio a dignissim fringilla. Pellentesque a gravida est. Nulla varius non velit eu imperdiet. Fusce posuere quis enim nec egestas. Morbi venenatis, ante pellentesque tincidunt auctor, risus lacus congue nibh, sed finibus dui odio sagittis sapien. Integer pharetra erat eget nunc ornare sagittis. Sed vestibulum, nisi a iaculis elementum, turpis velit scelerisque metus, a suscipit velit eros vitae arcu. Nullam et felis neque. Sed vel massa tempus erat lobortis laoreet. Ut sapien lacus, vestibulum ac sapien at, dapibus imperdiet ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Integer risus velit, lacinia non sapien vitae, consequat rutrum justo. Nam accumsan, dolor non cursus euismod, ante justo iaculis ligula, finibus ornare dolor ex et eros. In ex neque, elementum at pharetra id, facilisis eget odio. Sed ornare erat nunc, et lacinia nisi porta suscipit.`,
		},
		{
			slug: 'project-2',
			title: 'Project 2',
			description: 'Project 2 description',
			headerImage: 'https://picsum.photos/800/400',
			content: 'Project 2 content',
		},
		{
			slug: 'project-3',
			title: 'Project 3',
			description: 'Project 3 description',
			headerImage: 'https://picsum.photos/800/400',
			content: 'Project 3 content',
		},
		{
			slug: 'project-4',
			title: 'Project 3',
			description: 'Project 3 description',
			headerImage: 'https://picsum.photos/800/400',
			content: 'Project 3 content',
		},
	]
	return (
		<div className='flex flex-col gap-2 md:gap-4'>
			<SubHeading text='Projects' />
			<div className='flex flex-wrap gap-4 justify-center'>
				{projects.map((project: ProjectType) => (
					<div
						className='space-y-2 flex flex-col items-center  gap-4 bg-white/10 backdrop-blur-lg rounded-lg w-full md:w-1/3 cursor-pointer min-h-[6rem] md:h-[35rem] '
						key={project.slug}
					>
						<img
							className='w-full h-[300px] object-cover rounded-lg'
							src={project.headerImage}
							alt={project.title}
							width={300}
							height={300}
						/>
						<div className='p-2 md:p-4 flex flex-col gap-2 w-full'>
							<p className='text-lg text-start w-full line-clamp-1 font-bold'>
								{project.title}
							</p>
							<hr className='border-gray-200 w-full' />
							<p className='text-sm text-start w-full line-clamp-6 min-h-[7rem]'>
								{project.content}
							</p>
							<Link href={project.slug}>
								<PixelCard className='max-h-10 max-w-10 rounded-full'>
									<FaArrowUpRightFromSquare className='absolute' />
								</PixelCard>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProjectsSection
