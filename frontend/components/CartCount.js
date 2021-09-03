import styled from "styled-components";
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Dot = styled.div`
  background: var(--red);
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  margin-left: 1rem;
  font-feature-settings: "tnum";
  font-variant-numeric: tabular-nums;
`;

const AnimationStyles = styled.span`
    position: relative;
    .count-enter{
        background: green
    }

    .count-enter-active {
        background: yellow;
    }

    .count-exit {
        background: blue;
    }

    .count-exit-active{
        backgro
    }


`

export default function CartCount({ count }) {
  return (
    <TransitionGroup>
      <CSSTransition
        unmountOnExit
        className="count"
        classNames="count"
        key={count}
        timeout={{ enter: 5000, exit: 5000 }}
      >
        <Dot>{count}</Dot>
      </CSSTransition>
    </TransitionGroup>
  );
}
