import { DEMO_POSTS } from "data/posts";
import { PostDataType } from "data/types";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Comment from "shared/Comment/Comment";
import NcImage from "shared/NcImage/NcImage";
import SocialsList from "shared/SocialsList/SocialsList";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";
import Logo from "shared/Logo/Logo";

const BlogSingle = () => {
  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        style={{ padding: '16px' , marginTop: "6px" }}
        className="w-full dark:prose-invert prose-sm   lg:prose-lg mx-auto dark:prose-dark"
      >
        <div className="w-full" style={{ textAlign: "center" }}>
          <Logo className="w-40"></Logo>
        </div>
        <div className="flex place-content-center" style={{ marginTop: '12px'}}>
          <ButtonPrimary link="/">Voltar ao Site</ButtonPrimary>
        </div>
        <h3>
          <strong>TERMOS E CONDIÇÕES</strong>
        </h3>
        <p>"O SITE" -</p>
        <p>"O UTILIZADOR" -</p>
        <p>"O PROVEDOR DE SERVIÇOS" -</p>
        <p>
          Por favor, leia estes termos cuidadosamente antes de aceder ao site.
          Ao navegar no site, o utilizador concorda integralmente com estes
          termos e condições. Se o utilizador não aceitar ou tiver quaisquer
          reservas relativamente a estes termos, não deve usar o site.
        </p>
        <strong>Restrição de Idade</strong>
        <p style={{ marginTop: "-2px" }}>
          O site contém material sexualmente explícito e destina-se
          exclusivamente a adultos. O utilizador não deve navegar no site, se
          ficar ofendido com qualquer conteúdo ou se estiver a aceder a partir
          de um local onde a sua utilização possa ser considerada uma violação
          de qualquer lei.
        </p>
        <strong>Conteúdo Adulto</strong>
        <p style={{ marginTop: "-2px" }}>
          O site tem conteúdo adulto. Se o utilizador é menor de idade, de
          acordo com a lei vigente no local de onde o utilizador está a aceder
          ao site, o utilizador não deve navegar no site.
        </p>
        <strong>Propriedade e Direitos autorais</strong>
        <p style={{ marginTop: "-2px" }}>
          Salvo menção em contrário, o conteúdo de todas as páginas deste site,
          bem como todos os direitos de autor são propriedade do Provedor de
          Serviços. O Provedor de Serviços respeita os direitos de propriedade
          intelectual de terceiros e solicita que os anunciantes e os
          utilizadores do site façam o mesmo. Se o utilizador considerar que
          quaisquer direitos de propriedade intelectual foram violados no site,
          deve notificar o Provedor de Serviços desse facto, expondo os factos e
          as suas motivações.
        </p>
        <strong>Licença Limitada</strong>
        <p style={{ marginTop: "-2px" }}>
          O utilizador pode imprimir ou descarregar no disco o conteúdo de uma
          página individual do site para fins de uso pessoal e não comercial,
          mas nenhuma outra impressão, download, cópia, reprodução,
          distribuição, republicação, publicação ou transmissão de qualquer
          conteúdo do site é permitida sem a permissão prévia por escrito do
          Provedor de Serviços.
        </p>
        <strong>Anúncios</strong>
        <p style={{ marginTop: "-2px" }}>
          O site contém anúncios para adultos e de cariz explícito, não se
          limitando a anúncios de acompanhantes.<br></br>
          Todo o conteúdo de acompanhantes e outros conteúdos contidos neste
          site são fornecidos ao Provedor de Serviços pelos seus clientes e são
          de responsabilidade exclusiva de cada anunciante individual. O
          Provedor de Serviços não aceita qualquer responsabilidade pela
          exatidão de quaisquer anúncios no site, nem assegura qualquer garantia
          expressa ou implícita pela publicação.<br></br>O Provedor de Serviços
          não promove por sua conta quaisquer acompanhantes, agências de
          acompanhantes, pessoas ou empresas anunciadas no Site. O Provedor de
          Serviços não assume qualquer responsabilidade por qualquer perda ou
          dano de qualquer natureza decorrente de qualquer anúncio publicado no
          Site.
          <br></br>
          No caso de o utilizador obter bens ou serviços de terceiros anunciados
          no site, então a aquisição de tais bens ou serviços estará de acordo
          com seus termos e condições e o Provedor de Serviços não terá nenhuma
          responsabilidade em relação aos mesmos. Todos os anúncios enviados ao
          Provedor de Serviços estão sujeitos aos Termos e Condições de
          publicidade.
        </p>{" "}
        <strong>Comunidade (Fóruns, Chat, Blogs, Galerias)</strong>
        <p style={{ marginTop: "-2px" }}>
          O site contém material enviado por terceiros. Todo o material de
          terceiros contido neste site é da exclusiva responsabilidade do
          terceiro. O Provedor de Serviços não aceita qualquer responsabilidade
          pela precisão de qualquer material de terceiros no site, nem garante o
          conteúdo da publicação.<br></br>O Provedor de Serviços não assume
          nenhuma responsabilidade e especificamente nega e exclui toda e
          qualquer responsabilidade a qualquer pessoa por qualquer perda ou dano
          de qualquer natureza ou, igualmente, decorrente de qualquer material
          de terceiros publicado no Site.<br></br>
          Ao enviar qualquer material ao Provedor de Serviços, o utilizador
          concede automaticamente ao Provedor de Serviços o direito, royalty
          exclusivo, perpétuo, irrevogável, exclusivo e licença para usar,
          reproduzir, modificar, editar, adaptar, publicar, traduzir, criar
          trabalhos derivados, distribuir e exibir tal material (no todo ou em
          parte) em todo o mundo e/ou incorporá-lo em outras obras em qualquer
          forma, media ou tecnologia agora conhecida ou desenvolvida
          posteriormente para o termo completo de quaisquer direitos que possam
          existir em tal conteúdo. O utilizador reconhece que o Provedor de
          Serviços não é obrigado a publicar qualquer material enviado pelo
          utilizador.<br></br>O utilizador concorda em indemnizar e isentar o
          Prestador de Serviços de qualquer reivindicação ou demanda, incluindo
          honorários legais razoáveis, feitos por terceiros devido a ou
          decorrentes do material que o utilizador enviar ao site. Além disso, o
          utilizador está sujeito às Regras da Comunidade e de comentários ao
          enviar conteúdo para o site.<br></br>
        </p>{" "}
        <strong>Links</strong>
        <p style={{ marginTop: "-2px" }}>
          O site contém links para outros sites que não estão sob o controle do
          Provedor de Serviços. O Provedor de Serviços não é responsável pelo
          conteúdo e não endossa o material nesses outros sites. O Provedor de
          Serviços fornece esses links apenas para sua conveniência.
        </p>{" "}
        <strong>Aviso Legal</strong>
        <p style={{ marginTop: "-2px" }}>
          O uso deste site é feito por conta e risco dos visitantes e dos
          utilizadors. O Provedor de Serviços não oferece garantias ou
          representações quanto à exatidão de qualquer material publicado no
          site. O material no site não constitui aconselhamento e o utilizador
          não deve confiar em qualquer material no site para tomar qualquer
          decisão ou levar a cabo qualquer ação.
        </p>
        <strong>Jurisdição</strong>
        <p style={{ marginTop: "-2px" }}>
          O site é operado a partir de Portugal. Os tribunais portugueses terão
          jurisdição exclusiva sobre todas as reclamações ou disputas que surjam
          em relação ou em conexão com o site e seu uso e estes termos.
        </p>
        <strong>Validade</strong>
        <p style={{ marginTop: "-2px" }}>
          Se qualquer um destes termos for considerado ilegal, inválido, nulo ou
          por qualquer razão inaplicável, a validade e a aplicabilidade dos
          termos restantes não serão afetadas.
        </p>
        <strong>Contacto</strong>
        <p style={{ marginTop: "-2px" }}>
          info@apartadox.com<br></br>
          +351 916 010 776 (custo de chamada para a rede móvel nacional)
          <br></br>
        </p>
        <p>
          Estes termos podem ser atualizados periodicamente sem aviso prévio. O
          utilizador deve rever esta página periodicamente para alterações.
        </p>
        <h3>POLÍTICA DE COOKIES</h3>
        <p style={{ marginTop: "-2px" }}>
          Este Website recorre ao uso de cookies para proporcionar uma melhor
          utilização pelos seus visitantes, bem como para assegurar que o mesmo
          se encontra em pleno funcionamento. Para mais informações sobre nós e
          sobre a forma como protegemos as informações dos utilizadores consulte
          os nossos termos e condições.
          <br></br>
        </p>
        <p style={{ marginTop: "-2px" }}>
          De modo a disponibilizarmos um serviço personalizado e eficiente aos
          nossos utilizadores torna-se necessário memorizar e armazenar
          informação sobre a forma como este Website deve ser utilizado. Para
          tal, utilizamos ficheiros de texto reduzido denominados por cookies
          que contêm quantidades de informação reduzidas descarregadas para o
          computador ou outros dispositivos dos nossos utilizadores através de
          um servidor. O seu browser de internet posteriormente envia, em cada
          visita subsequente, estas cookies de volta para o Website, permitindo
          o reconhecimento e memorização da identidade dos nossos visitantes,
          designadamente as preferências de utilização dos nossos utilizadores.
          Poderá encontrar{" "}
          <a href="https://www.aboutcookies.org/" target="_blank">
            aqui
          </a>{" "}
          informação mais detalhada sobre cookies e o seu respectivo
          functionamento.
          <br></br>
        </p>
        <p style={{ marginTop: "-2px" }}>
          A navegação neste Website permite a recolha de informação com recurso
          a cookies e demais tecnologias. Ao usar este site aceita o uso de
          cookies tal como descrito nesta Notificação de Cookies.
          <br></br>
        </p>
        <strong>Quais os tipos de Cookies utilizados e porquê?</strong>
        <p style={{ marginTop: "-2px" }}>
          Parte das cookies a que recorremos são necessárias para permitir a
          navegação neste Website bem como tirar partido das suas
          funcionalidades tais como saber de onde nos está a aceder e também
          para saber se já aceitou a nossa política de cookies, que tem a
          validade de um dia.<br></br>O nosso Website também recorre ao uso de
          cookies funcionais para gravar informação sobre as opções dos nossos
          utilizadores e permitir customizar o nosso Website às necessidades dos
          mesmos; por exemplo, memorizar a língua de origem. A informação
          gravada é anónima e destina-se apenas ao fim acima indicado.<br></br>
          Podemos utilizar, direta ou indiretamente, serviços de webanalytics
          para aferir a eficácia dos nossos conteúdos e as preferências dos
          nossos utilizadores que nos permitem contribuir para a otimização do
          funcionamento deste Website. Adicionalmente, recorremos a cookies de
          desempenho para monitorizar a forma como os utilizadores
          individualmente acedem ao nosso Website e com que regularidade. Esta
          informação é usada apenas para efeitos estatísticos sem identificação
          de qualquer utilizador em particular.<br></br>
          Este Website não recorre à utilização de Targeting Cookies para
          promover publicidade direcionada aos nossos visitantes.<br></br>
          Sempre que pretendam informação detalhada sobre as cookies utilizadas
          no nosso Website agradecemos o vosso contacto.<br></br>
        </p>
        <strong>Como controlar as Cookies?</strong>
        <p style={{ marginTop: "-2px" }}>
          Os utilizadores do Website aceitam a introdução das cookies nos seus
          computadores ou dispositivos nos termos acima indicados sem prejuízo
          do controle e gestão disponíveis. Informamos os utilizadores que a
          remoção ou bloqueio das cookies poderá afetar a sua experiência de
          utilização e poderá limitar o acesso a algumas zonas do Website.
        </p>
        <strong>Controlos no browser</strong>
        <p style={{ marginTop: "-2px" }}>
          Os utilizadores do Website aceitam a introdução das cookies nos seus
          computadores ou dispositivos nos termos acima indicados sem prejuízo
          do controle e gestão disponíveis. Informamos os utilizadores que a
          remoção ou bloqueio das cookies poderá afetar a sua experiência de
          utilização e poderá limitar o acesso a algumas zonas do Website.{" "}
          <a href="https://www.aboutcookies.org/" target="_blank">
            AboutCookies.org
          </a>{" "}
          ,{" "}
          <a href="http://www.cookiecentral.com/faq/" target="_blank">
            Cookiecentral.com
          </a>
        </p>
        <strong>Gestão de Analytics Cookies</strong>
        <p style={{ marginTop: "-2px" }}>
          Os nossos utilizadores poderão escolher excluir o seu anonimato na sua
          atividade de navegação dentro dos websites monitorizados por analytics
          cookies. Nós usamos os seguintes prestadores de serviços onde poderão
          obter mais informações sobre as políticas de privacidade dos mesmos e
          como excluir as suas cookies clicando nos seguintes links:{" "}
          <a
            href="https://www.google.com/analytics/learn/privacy.html"
            target="_blank"
          >
            Google Analytics
          </a>
        </p>
        <strong>Social buttons</strong>
        <p style={{ marginTop: "-2px" }}>
          Nós recorremos ao uso de social buttons para permitir aos nossos
          utilizadores partilharem ou adicionarem páginas aos favoritos. Estes
          botões são relativos a redes sociais as quais poderão obter
          informações sobre as atividades dos nossos visitantes na Internet,
          incluindo sobre o nosso Website. O entendimento do modo como a
          informação é utilizada e como podem ser excluídos da sua recolha deve
          ser obtido através da revisão dos respetivos Termos de Utilização e
          Políticas de Privacidade desses websites.
        </p>
        <strong>Comunicações via Email</strong>
        <p style={{ marginTop: "-2px" }}>
          Para aferir a pertinência das nossas comunicações podemos usar
          tecnologias de monitorização para determinar se os nossos visitantes
          leram, clicaram em links ou reencaminharam determinadas comunicações
          através de email por nós enviadas. Em caso de desacordo com esse modo
          de proceder os nossos utilizadores devem reverter a sua subscrição
          (unsubscribe) dado que não é possível enviar estes emails sem estes
          mecanismos de monitorização ativos. Os subscritores registados podem
          atualizar as suas preferências de comunicação a qualquer momento
          contactando-nos através do email <br></br>
          Esta Política de cookies pode ser revista a qualquer momento, de
          acordo com o nosso critério. Quando se fizerem tais alterações, a data
          de revisão no topo da página será alterada. A Política de cookies
          alterada entrará em vigor a partir da data de revisão. Recomendamos os
          utilizadores do nosso website que revejam as Políticas de cookies
          periodicamente, com o propósito de ficarem informados sobre a nossa
          gestão das cookies.
          <br></br>A informação que consta neste documento denominado Termo e
          Condições foi redigida na língua portuguesa. Não nos responsabilizamos
          por qualquer tipo de tradução do conteúdo em questão.
        </p>
        <div className="flex place-content-center" style={{ marginTop: '12px'}}>
          <ButtonPrimary link="/">Voltar ao Site</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      <Helmet>
        <title>Termos e Condições || Xclusivo</title>
      </Helmet>
      <div
        className="nc-SingleContent container space-y-10 w-full"
      >
        {renderContent()}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
      </div>
    </div>
  );
};

export default BlogSingle;
