import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 md:py-24 px-4 md:px-6" style={{ background: "var(--verve-dark)", color: "var(--verve-cream)" }}>
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 mb-10 font-body text-sm"
          style={{ color: "var(--verve-gold)", textDecoration: "none" }}
        >
          <Icon name="ArrowLeft" size={16} />
          На главную
        </Link>

        <h1 className="font-display text-3xl md:text-5xl font-light mb-8" style={{ color: "var(--verve-cream)" }}>
          Политика обработки<br /><em className="italic" style={{ color: "var(--verve-gold)" }}>персональных данных</em>
        </h1>

        <div className="font-body text-sm leading-relaxed space-y-5" style={{ color: "rgba(28,20,16,0.7)" }}>
          <p>
            Настоящая Политика определяет порядок обработки и защиты персональных данных пользователей сайта
            студии пилатеса VERVE (далее — «Оператор»), которые пользователь предоставляет при заполнении
            форм обратной связи на сайте.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>1. Какие данные собираются</h2>
          <p>
            Оператор обрабатывает следующие персональные данные, которые пользователь указывает добровольно
            при заполнении формы записи: имя и номер телефона.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>2. Цели обработки данных</h2>
          <p>
            Персональные данные обрабатываются исключительно с целью связи с пользователем для консультации
            по услугам студии, записи на тренировку и информирования об акциях и специальных предложениях.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>3. Порядок обработки и хранения</h2>
          <p>
            Данные передаются и хранятся в защищённом виде. Оператор принимает необходимые организационные
            и технические меры для защиты персональных данных от неправомерного доступа, уничтожения,
            изменения, блокирования, копирования, распространения.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>4. Передача третьим лицам</h2>
          <p>
            Оператор не передаёт персональные данные пользователей третьим лицам, за исключением случаев,
            прямо предусмотренных законодательством Российской Федерации.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>5. Согласие на обработку</h2>
          <p>
            Заполняя форму на сайте и отправляя данные, пользователь подтверждает своё согласие на обработку
            персональных данных на условиях настоящей Политики. Согласие действует до момента его отзыва
            пользователем путём направления соответствующего обращения Оператору.
          </p>

          <h2 className="font-body font-semibold text-base mt-8 mb-2" style={{ color: "var(--verve-cream)" }}>6. Права пользователя</h2>
          <p>
            Пользователь вправе в любой момент запросить информацию о своих персональных данных, потребовать
            их уточнения, блокирования или уничтожения, а также отозвать согласие на обработку, обратившись
            к Оператору по контактам, указанным на сайте.
          </p>
        </div>
      </div>
    </div>
  );
}